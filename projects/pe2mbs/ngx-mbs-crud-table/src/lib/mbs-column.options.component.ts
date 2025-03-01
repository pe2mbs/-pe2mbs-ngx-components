/**
*   Angular 12 CRUD column select and sizing compnent for main component.  
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
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IMbsColumn, IMbsColumnOptions } from './mbs-crud.models';


@Component({
    selector: 'mbs-column.options',
    templateUrl: './mbs-column.options.component.html',
    styleUrls: [ './mbs-column.options.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MbsColumnOptionsDialog
{
    public displayedColumns: string[] = [ 'select', 'caption', 'name', 'width' ];
    public dataSource!: MatTableDataSource<IMbsColumn>;

    constructor( public dialogRef: MatDialogRef<MbsColumnOptionsDialog>,
                 @Inject(MAT_DIALOG_DATA) public data: IMbsColumnOptions ) 
    { 
        this.dataSource = new MatTableDataSource<IMbsColumn>( this.data.columns );
        return;
    }
   
    public isAllSelected(): boolean
    {
        const numSelected = this.dataSource.data.filter( row => row.active ).length;
        const numRows = this.dataSource.data.length;
        return ( numSelected === numRows );
    }

    public onToggle( row: IMbsColumn )
    {
        row.active = !row.active;
        return;
    }

    public masterToggle()
    {
        if ( this.isAllSelected() )
        {
            this.dataSource.data.forEach( row => row.active = false );
        }
        else
        {
            this.dataSource.data.forEach( row => row.active = true );
        }
        return;
    }

    public onCancel(): void
    {
        this.dialogRef.close( undefined );
        return;
    }

    public onApprove(): void
    {
        this.dialogRef.close( this.dataSource.data );
        return;
    }

    public ngOnInit(): void
    {
        if ( this.dataSource.data.length > 8 ) 
        {
            this.updateSize();
        }
        return;
    }

    public updateSize(): void 
    {
        this.dialogRef.updateSize( "60%", "80%" );
        return;
    }
}
