import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';

@Component({
    selector: 'mdt-date-cell',
    template: '{{ row[ column.name ] | date:dateFormat }}'
})
export class DateCellComponent implements CellComponent, OnInit {
    @Input() column!: ColumnConfig;
    @Input() row!: any;

    dateFormat = 'short';

    public ngOnInit(): void
    {
        if ( this.column.options ) 
        {
            if ( this.column.options.dateFormat ) 
            {
                this.dateFormat = this.column.options.dateFormat;
            }
        }
        return;
    }
}