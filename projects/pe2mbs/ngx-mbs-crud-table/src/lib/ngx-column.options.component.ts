import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IColumn, IGcColumnOptions } from './ngx-crud.models';


@Component({
    selector: 'lib-column.options',
    templateUrl: './ngx-column.options.component.html',
    styleUrls: [ './ngx-column.options.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxColumnOptionsDialog
{
    public displayedColumns: string[] = ['select', 'caption', 'name', 'width' ];
    public dataSource!: MatTableDataSource<IColumn>;

    constructor( public dialogRef: MatDialogRef<NgxColumnOptionsDialog>,
                 @Inject(MAT_DIALOG_DATA) public data: IGcColumnOptions ) 
    { 
        this.dataSource = new MatTableDataSource<IColumn>( this.data.columns );
        return;
    }
   
    public isAllSelected(): boolean
    {
        const numSelected = this.dataSource.data.filter( row => row.active ).length;
        const numRows = this.dataSource.data.length;
        return ( numSelected === numRows );
    }

    public onToggle( row: IColumn )
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
}
