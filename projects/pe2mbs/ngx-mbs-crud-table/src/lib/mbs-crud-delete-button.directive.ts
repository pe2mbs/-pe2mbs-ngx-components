/**
*   Angular 12 CRUD delete directive for main component.  
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
import { Component, Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { MbsCrudTableComponent } from './mbs-crud-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ECrudOption } from './mbs-crud.models';


@Component( { 
    selector: 'mbs-delete-dialog',
    template: ``
} )
export class MbeCrudDeleteDialog
{
    constructor()
    {
        return;
    }
}


@Directive({
    selector: '[mbsCrudDeleteButton]'
})
export class MbsCrudDeleteButtonDirective 
{
    @Input( 'mbsCrudDeleteButton' )     row: any;

    constructor( private dialog: MatDialog,
                 @Inject( forwardRef(() => MbsCrudTableComponent ) ) private parent: MbsCrudTableComponent ) 
    { 
        return;
    }

    @HostListener('click') doDeleteRequest(): void 
    {
        if ( this.parent.dataSource.isCrudOption( ECrudOption.Delete ) )
        {
            const dialogRef = this.dialog.open( MbeCrudDeleteDialog,
                {
                    data: {


                    }
                }
            )
            dialogRef.afterClosed().subscribe( (del: boolean) => {
                if ( del )
                {
                    this.parent.dataSource.crudService.delete( this.row );
                }
            } );
        } 
        else
        {
            alert( "You're not allowed to delete a record" );
        }
        return;
    }

}
