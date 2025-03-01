/**
*   Angular 12 CRUD filter directive for main component.  
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
import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MbsCrudFilterDialog } from "./mbs-filter.dialog";
import { EMbsFilterModes, IMbsFilterRequest, IMbsFilterSettings } from "./mbs-crud.models";


@Directive({
    selector: '[mbsFilter]',
})
export class MbsCrudFilterDirective implements OnInit
{
    @Output()   confirm = new EventEmitter<any>();
    @Input()    columnInfo: any; 
    @Input()    filterColor!: string;
    
    protected   colors: string[] = [ 'black', 'red' ];

    @HostListener('click') doConfirm() 
    {
        const dialogRef = this.dialog.open( MbsCrudFilterDialog, { data: {
            element:    this.element,
            column:     this.columnInfo,
        } as IMbsFilterRequest } );
        dialogRef.afterClosed().subscribe( ( filter: IMbsFilterSettings ) => {
            if ( filter.mode == EMbsFilterModes.Cleared )
            {
                this.render.setStyle( this.element.nativeElement, 'color', this.colors[ 0 ] );
            }
            else
            {
                this.render.setStyle( this.element.nativeElement, 'color', this.colors[ 1 ] );
            }
            this.confirm.emit( filter );
        } );
        return;
    }
  
    constructor( private dialog: MatDialog, private element: ElementRef, protected render: Renderer2 ) 
    {
        return;
    }

    public ngOnInit(): void 
    {
        if ( typeof this.filterColor == 'string' )
        {
            const colors = this.filterColor.split( ',' );
            if ( this.colors.length != 2 ) 
            {
                throw Error( 'filterColor must be two colors comma separated' );
            }
            this.colors = colors;
        }
        return;    
    }
}