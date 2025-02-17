import { AfterViewInit, Component, ElementRef, Injectable, Input, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from "rxjs";
import { tap } from 'rxjs/operators';
import { CCrudDefaultRights, EFilterModes, IActionButton, IColumn, IComponentInfo, ICrudRights, 
         IFilterSettings, IGcColumnOptions, IPagedRequest, IRouteParameters } from "./ngx-crud.models";
import { ChangeDetectorRef } from '@angular/core';
import { NgxCrudTableResizeDirective } from "./ngx-resize.directive";
import { NgxCrudDataSource } from "./ngx-crud.datasource";
import { NgxColumnOptionsDialog } from "./ngx-column.options.component";
import { NgxStorageInterface } from "./ngx-abscract-storage.interface";


@Component( {
    selector: 'gc-generic-table',
    templateUrl: './ngx-crud-table.component.html',
    styleUrls: [ './ngx-crud-table.component.scss' ]
} )
export class NgxCrudTableComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild( MatTable,               { read: ElementRef } )  private matTableRef!: ElementRef;
    @ViewChild( MatPaginator,           { static: true } )      private paginator!: MatPaginator;
    @ViewChild( MatSort,                { static: true } )      private sort!: MatSort;
    @ViewChild( NgxCrudTableResizeDirective, { static: true } )      private resizeTable!: NgxCrudTableResizeDirective;
    
    @Input()                            tableName!: string    
    @Input()                            filterColor!: string 
    @Input()                            dataSource!: NgxCrudDataSource<any>;
    @Input()                            columns!: IColumn[];
    @Input()                            headerButtons: IActionButton[] = []
    @Input()                            autoRefresh: number = 0;
    @Input()                            resize: boolean = false;
    @Input()                            parameters!: IRouteParameters; 
    @Input()                            storageInterface!: NgxStorageInterface; 

    public                              rights: ICrudRights = CCrudDefaultRights;
    public displayedColumns:            string[] = [];
    private subscription$:              Array<Subscription> = [];
    private filter:                     BehaviorSubject<any> = new BehaviorSubject<any>( null );
    public timerHandle:                 any | undefined = undefined;
    public widthColumns:                Array<string> = [];
    public pageInfo: IPagedRequest = {
        page: 1,
        pageSize: 10,
        cached: false,
        sorted: undefined,
        filters: undefined,
        suppress: undefined,
    }
    
    constructor( private route: ActivatedRoute, private dialog: MatDialog, private cd: ChangeDetectorRef ) 
    { 
        return;
    }

    public ngOnInit(): void 
    {       
        this.subscription$.push( fromEvent( window, 'resize' ).subscribe( evt => {
            console.log('table-resize:', evt );
            this.refreshDislay();
        } ) );
        this.subscription$.push( this.route.queryParams.subscribe( (params:IRouteParameters | any) => {
			if ( params.mode && params.mode == 'filter' ) 
			{
                this.parameters = params;
			}
		} ) )
        this.setDisplayedColumns();
        this.dataSource.paginator = this.paginator;
        this.paginator.pageSize = 5;
        this.onPageEvent( null );
        this.restoreTableInfo();
        this.dataSource.load( this.pageInfo );
        return
    }

    public ngOnDestroy(): void 
    {
        this.subscription$.forEach( subscriber => { 
            subscriber.unsubscribe();
        } );
        if ( this.timerHandle != undefined )
        {
            clearInterval( this.timerHandle );
            this.timerHandle = undefined;
        }
        return;
    }

    public refresh( $event: any | null = null ): void
    {
        this.filter.next( $event );
        return;
    }

    public onAutoRefresh( $event: any )
    {
        if ( this.timerHandle == undefined )
        {
            this.timerHandle = setInterval( () => {
                this.filter.next( null );
            }, this.autoRefresh * 1000 );
        }
        else
        {
            clearInterval( this.timerHandle );
            this.timerHandle = undefined;
        }
        return;
    }

    public ngAfterViewInit() : void
    {
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
        } );
        // @ts-ignore
        this.subscription$.push( merge( this.sort.sortChange, this.paginator.page, this.filter ).pipe( tap( () => {
            console.log( "Reload data", this.timerHandle );
            this.dataSource.load( this.pageInfo ); 
        } ) ).subscribe() ); 
        return;
    }

    public onSortChange( $event: any ): void
    {
        this.pageInfo.sorted = undefined;
        if ( $event.direction != '' )
        {
            this.pageInfo.sorted = { column: $event.active, algorithm: $event.direction }
        }    
        return;
    }

    public onFilter( $event: IFilterSettings ): void
    {
        this.pageInfo.filters = [];
        // Set the filter on the columns object and build new filter set for backend 
        this.columns.forEach( (column: IColumn) => {
            if ( column.field == $event.column )
            {
                column.currentFilter = $event  
            }
            if ( column.currentFilter && column.currentFilter.mode != EFilterModes.Cleared )
            {
                this.pageInfo.filters?.push( column.currentFilter );
            }
        } );
        if ( this.pageInfo.filters.length == 0 )
        {
            this.pageInfo.filters = undefined;
        }
        this.filter.next( $event );
        return;
    }

    public onPageEvent( $event: any ): void 
    {
        // {previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 20}
        this.pageInfo.page     = this.paginator.pageIndex;
        if ( this.pageInfo.pageSize != this.paginator.pageSize )
        {
            this.storeTableInfo()
        }
        this.pageInfo.pageSize = this.paginator.pageSize;
        return
    }

    public setDisplayedColumns(): void 
    {
        this.displayedColumns = [];
        this.widthColumns = [];
        this.columns.forEach( (column, index) => {
            column.index = index;
            if ( column.active )
            {
                this.widthColumns.push( column.width );
                this.displayedColumns.push( column.field );
            }
        } );
        return;
    }

    public onViewSettings( $event: any )
    {
        const dialogRef = this.dialog.open( NgxColumnOptionsDialog, {
            width: '50%',
            height: '60%',
            data: {
                columns: this.columns.slice(),
                edit: this.resize 
            } as IGcColumnOptions
        } );
        
        dialogRef.afterClosed().subscribe( result => {
            if ( result !== undefined ) 
            {
                let dispColumns: string[] = [];
                this.widthColumns = [];
                result.forEach( (column:IColumn) => {
                    this.columns.filter( value => column.field == value.field )[ 0 ].active = column.active;
                    if ( column.active )
                    {
                        dispColumns.push( column.field );
                        this.widthColumns.push( column.width );
                    }
                } ); 
                this.storeTableInfo();
                this.displayedColumns = dispColumns;
                setTimeout( () =>  this.refreshDislay(), 0 );
            }
        } );
        return;
    }

    private refreshDislay(): void
    {
        const tmp = this.displayedColumns.slice();
        // This is required to make sure the table is correctly rebuild on a resize event.
        this.displayedColumns = [];
        this.cd.detectChanges();
        this.displayedColumns = tmp; 
        setTimeout( () =>  this.resizeTable.refresh(), 0 );
        return;
    }

    private storeTableInfo(): void
    {
        if ( this.storageInterface )
        {
            this.storageInterface.storeComponentInfo( this.tableName, {
                table: {
                    columns: this.columns,
                    pagesize: this.paginator.pageSize
                }
            } as IComponentInfo );
        }
        return;
    }

    private restoreTableInfo(): void 
    {
        if ( this.storageInterface )
        {
            this.storageInterface.restoreComponentInfo( this.tableName, {
                table: { 
                    columns: this.columns,
                    pagesize: this.paginator.pageSize
                }
            } as IComponentInfo ).subscribe( (info: IComponentInfo) => {
                this.paginator.pageSize = this.pageInfo.pageSize = info.table?.pagesize as number;
                let dispColumns: string[] = [];
                this.widthColumns = [];
                (info.table?.columns as Array<IColumn>).forEach( (col:IColumn) => {
                    const column    = this.columns.filter( value => col.field == value.field )[ 0 ];
                    column.active   = col.active;
                    column.width    = col.width;
                    if ( column.active )
                    {
                        dispColumns.push( column.field );
                        this.widthColumns.push( column.width );
                    }
                } ); 
                this.displayedColumns = dispColumns;
                this.refreshDislay();
            } );
        }
        return;
    }
}
