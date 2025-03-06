/**
*   Angular 12 CRUD button component for main component.  
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
import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component( { 
    selector: 'mbs-table-button',
    template: `<button class="table-icon-button" [disabled]="disabled"
                (click)="onClick( $event )" [matTooltip]="tooltip" >
    <mat-icon [fontSet]="fontSet" [fontIcon]="fontIcon"></mat-icon>
</button>`,
    styleUrls: [ './mbs-table-button-component.scss' ]
} )
export class MbsTableButton 
{
    @Input()    disabled: boolean = false;   
    @Input()    color!: string;
    @Input()    tooltip!: string;
    @Input()    fontSet!: string
    @Input()    fontIcon!: string

    @Output()   click: EventEmitter<any> = new EventEmitter<any>();

    public onClick( $event: any ): void
    {
        $event.stopPropagation();
        this.click.emit( $event );
        return;
    }
}
