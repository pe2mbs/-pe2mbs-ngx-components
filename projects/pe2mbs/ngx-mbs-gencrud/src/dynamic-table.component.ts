import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/table';
import { MdtMultiSort } from './multi-sort/multi-sort.directive';
import { ColumnConfig } from './column-config.model';
import { ColumnFilter } from './column-filter.model';
import { ColumnFilterService } from './table-cell/cell-types/column-filter.service';


@Component({
    selector: 'mdt-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent implements OnInit 
{
    @Input() columns!:          ColumnConfig[];
    @Input() dataSource!:       DataSource<any>;
    @Input() pageSize           = 20;
    @Input() pageSizeOptions    = [20, 50, 100];
    @Input() showFilters        = true;
    @Input() stickyHeader       = false;
    @Input() multiSort          = false;
    @Input() hintDelay          = 500;
    @Input() paginator!:        MatPaginator;

    @Output() rowClick          = new EventEmitter<any>();

    displayedColumns!: string[];

    @ViewChild( MdtMultiSort, { static: true }) public  sort!:              MdtMultiSort;
    @ViewChild( MatPaginator, { static: true }) private internalPaginator!: MatPaginator;

    private appliedFilters: { [key: string]: any; } = {};
    public isDialogOpen = false;

    constructor( private readonly columnFilterService: ColumnFilterService, private readonly dialog: MatDialog ) 
    {
        return;
    }

    public ngOnInit(): void  
    {
        if ( this.dataSource == null )  
        {
            throw Error( 'DynamicTable must be provided with data source.' );
        }
        if ( this.columns == null ) 
        {
            throw Error( 'DynamicTable must be provided with column definitions.' );
        }
        if ( this.paginator === undefined ) 
        {
            this.paginator = this.internalPaginator;
        }
        this.columns.forEach( ( column, index ) => column.name = this.prepareColumnName( column.name, index ) );
        this.displayedColumns = this.columns.map( ( column, index ) => column.name );
        const dataSource = this.dataSource as any;
        dataSource.sort = this.sort;
        dataSource.paginator = this.paginator;
        return;
    }

    public isUsingInternalPaginator(): boolean 
    {
        return this.paginator === this.internalPaginator;
    }

    public canFilter( column: ColumnConfig ): boolean 
    {
        const filter = this.columnFilterService.getFilter(column.type);
        return ( filter != null );
    }

    public isFiltered( column: ColumnConfig ): boolean 
    {
        return ( this.appliedFilters[ column.name ] );
    }

    public getFilterDescription( column: ColumnConfig ): object | null
    {
        const filter = this.appliedFilters[ column.name ];
        if (!filter || !filter.getDescription) {
            return ( null );
        }

        return ( filter.getDescription() );
    }

    public prepareColumnName( name: string | undefined, columnNumber: number ): string 
    {
        return ( name || 'col' + columnNumber );
    }

    public onFilterClick( event: Event, column: ColumnConfig ): void 
    {
        this.filter( column );
        event.stopPropagation();
        return;
    }

    public filter( column: ColumnConfig ): void
    {
        if ( this.isDialogOpen ) 
        {
            return;
        }
        const filter = this.columnFilterService.getFilter( column.type );
        if ( filter ) 
        {
            const dialogConfig = new MatDialogConfig();
            const columnFilter = new ColumnFilter();
            columnFilter.column = column;
            if ( this.appliedFilters[ column.name ] ) 
            {
                columnFilter.filter = Object.create( this.appliedFilters[ column.name ] );
            }
            dialogConfig.data = columnFilter;
            const dialogRef = this.dialog.open( filter, dialogConfig );
            this.isDialogOpen = true;
            dialogRef.afterClosed().subscribe( result => {
                if ( result ) 
                {
                    this.appliedFilters[ column.name ] = result;
                } 
                else if ( result === '' ) 
                {
                    delete this.appliedFilters[column.name];
                }

                if ( result || result === '' ) 
                {
                    this.updateDataSource();
                }
                this.isDialogOpen = false;
            });
        }
        return;
    }

    public clearFilters(): void 
    {
        this.appliedFilters = {};
        this.updateDataSource();
        return;
    }

    protected updateDataSource(): void 
    {
        const dataSource = this.dataSource as any;
        dataSource.filters = this.getFilters();
        return;
    }

    public getFilters(): string[] 
    {
        const filters = this.appliedFilters;
        const filterArray = Object.keys(filters).map(( key ) => filters[key]);
        return ( filterArray );
    }

    public getFilter(columnName: string): any 
    {
        const filterColumn = this.getColumnByName( columnName );
        if ( !filterColumn ) 
        {
            throw Error(`Column with name '${ columnName }' does not exist.`);
        }
        return ( this.appliedFilters[ filterColumn.name ] );
    }

    public setFilter( columnName: string, filter: any ): void
    {
        const filterColumn = this.getColumnByName( columnName );
        if ( !filterColumn ) 
        {
            throw Error(`Cannot set filter for a column. Column with name '${ columnName }' does not exist.`);
        }
        this.appliedFilters[ filterColumn.name ] = filter;
        this.updateDataSource();
        return;
    }

    public getSort(): object 
    {
        return ( this.sort.sortedBy );
    }

    public setSort( sortedBy: { id: string, direction: 'asc' | 'desc' }[] ) 
    {
        this.sort.sortedBy = sortedBy;
        return;
    }

    private getColumnByName( columnName: string ): ColumnConfig | undefined 
    {
        return this.columns.find( c => ( c.name ? c.name.toLowerCase() : c.name ) === ( columnName ? columnName.toLowerCase() : columnName ) );
    }

    public onRowClick( row: any ): void 
    {
        this.rowClick.next( row );
        return;
    }
}
