/**
*   Angular 12 mbs-header component.  
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
import { Component, Input, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'mbs-header',
    template: `<div><mat-toolbar [color]="color">
    <ng-content select="[mbsHeaderLogo],mbs-header-logo"> </ng-content>
    <ng-content select="[mbsHeaderLeft],mbs-header-left"> </ng-content>
    <span class="spacer"></span>
    <ng-content select="[mbsHeaderCenter],mbs-header-center"> </ng-content>
    <span class="spacer"></span>
    <ng-content select="[mbsHeaderRight].mbs-header-right"></ng-content>
</mat-toolbar></div>`,
    styles: [ `
:host
{
    width: 100%;
    height: 60px;
}
.spacer 
{
    flex: 1 1 auto;
}` ],
    encapsulation: ViewEncapsulation.None
} )
export class MbsHeaderComponent
{
    @Input()  color: string = 'primary';

    constructor() 
    { 
        return;
    }
}
