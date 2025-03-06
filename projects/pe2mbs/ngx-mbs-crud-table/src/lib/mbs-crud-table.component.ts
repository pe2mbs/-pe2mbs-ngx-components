/**
*   Angular 12 CRUD component with filtering, sorting and paging on backend.  
* 
*   Copyright (C) 2020-2025  Marc Bertens-Nguyen  <m.bertens@pe2mbs.nl>
*
*   This program is free software; you can redistribute it and/or
*   modify it under the terms of the GNU General Public License
*   as published by the Free Software Foundation; only version 2.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program; if not, see <https://www.gnu.org/licenses/>.
**/
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, fromEvent, merge, Subscription } from "rxjs";
import { tap } from 'rxjs/operators';
import { CMbsCrudDefaultRights, EMbsFilterModes, IMbsColumn, IMbsComponentInfo, IMbsCrudRights, 
         IMbsFilterSettings, IMbsColumnOptions, IMbsPagedRequest, IMbsRouteParameters } from "./mbs-crud.models";
import { ChangeDetectorRef } from '@angular/core';
import { MbsCrudTableResizeDirective } from "./mbs-resize.directive";
import { MbsCrudDataSource } from "./mbs-crud.datasource";
import { MbsColumnOptionsDialog } from "./mbs-column.options.component";
import { MbsStorageInterface } from "./mbs-abscract-storage.interface";



@Component( {
    selector: 'mbs-generic-table',
    templateUrl: './mbs-crud-table.component.html',
    styleUrls: [ './mbs-crud-table.component.scss' ]
} )
export class MbsCrudTableComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild( MatTable,               { read: ElementRef } )  private matTableRef!: ElementRef;
    @ViewChild( MatPaginator,           { static: true } )      private paginator!: MatPaginator;
    @ViewChild( MatSort,                { static: true } )      private sort!: MatSort;
    @ViewChild( MbsCrudTableResizeDirective, { static: true } )      private resizeTable!: MbsCrudTableResizeDirective;
    
    @Input()                            tableName!: string    
    @Input()                            filterColor!: string 
    @Input()                            dataSource!: MbsCrudDataSource<any>;
    @Input()                            columns!: IMbsColumn[];
    @Input()                            autoRefresh: number = 0;
    @Input()                            resize: boolean = false;
    @Input()                            parameters!: IMbsRouteParameters; 
    @Input()                            storageInterface!: MbsStorageInterface; 

    public                              rights: IMbsCrudRights = CMbsCrudDefaultRights;
    public displayedColumns:            string[] = [];
    private subscription$:              Array<Subscription> = [];
    private filter:                     BehaviorSubject<any> = new BehaviorSubject<any>( null );
    public timerHandle:                 any | undefined = undefined;
    public widthColumns:                Array<string> = [];
    public pageInfo: IMbsPagedRequest = {
        page: 1,
        pageSize: 10,
        cached: false,
        sorted: undefined,
        filters: undefined,
        suppress: undefined,
    }
    
    constructor( private route: ActivatedRoute, private dialog: MatDialog, 
                 private cd: ChangeDetectorRef ) 
    { 
        return;
    }

    public ngOnInit(): void 
    {       
        this.subscription$.push( fromEvent( window, 'resize' ).subscribe( evt => {
            this.refreshDislay();
        } ) );
        this.subscription$.push( this.route.queryParams.subscribe( (params:IMbsRouteParameters | any) => {
			if ( params.mode && params.mode == 'filter' ) 
			{
                this.parameters = params;
			}
		} ) );
        this.subscription$.push( this.dataSource.tableSubject.subscribe( () => {
            this.updateDisplay( this.columns );
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

    public onFilter( $event: IMbsFilterSettings ): void
    {
        this.pageInfo.filters = [];
        // Set the filter on the columns object and build new filter set for backend 
        this.columns.forEach( (column: IMbsColumn) => {
            if ( column.field == $event.column )
            {
                column.currentFilter = $event  
            }
            if ( column.currentFilter && column.currentFilter.mode != EMbsFilterModes.Cleared )
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

    public setFixedFilter( filter: IMbsFilterSettings )
    {
        this.pageInfo.filters?.push( );
        this.filter.next( null );
    }

    public onPageEvent( $event: any ): void 
    {
        // {previousPageIndex: 0, pageIndex: 0, pageSize: 10, length: 20}
        this.pageInfo.page     = this.paginator.pageIndex;
        if ( this.pageInfo.pageSize != this.paginator.pageSize )
        {
            this.storeTableInfo();
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
        const dialogRef = this.dialog.open( MbsColumnOptionsDialog, {
            width: '50%',
            height: '60%',
            data: {
                columns: this.columns.slice(),
                edit: this.resize 
            } as IMbsColumnOptions
        } );
        
        dialogRef.afterClosed().subscribe( result => {
            if ( result !== undefined ) 
            {
                this.updateDisplay( result );
            }
        } );
        return;
    }

    private updateDisplay( result: IMbsColumn[] )
    {
        let dispColumns: string[] = [];
        this.widthColumns = [];
        result.forEach( (column:IMbsColumn) => {
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
            } as IMbsComponentInfo );
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
            } as IMbsComponentInfo ).subscribe( (info: IMbsComponentInfo) => {
                this.paginator.pageSize = this.pageInfo.pageSize = info.table?.pagesize as number;
                let dispColumns: string[] = [];
                this.widthColumns = [];
                (info.table?.columns as Array<IMbsColumn>).forEach( (col:IMbsColumn) => {
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
