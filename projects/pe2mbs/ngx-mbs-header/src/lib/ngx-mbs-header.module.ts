/**
*   Angular 12 module of mbs-header component.  
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
import { NgModule } from '@angular/core';
import { MbsHeaderComponent } from './ngx-mbs-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MbsHeaderLogoDirective } from './mbs-header-logo.directive';
import { MbsHeaderLeftDirective } from './mbs-header-left.directive';
import { MbsHeaderCenterDirective } from './mbs-header-center.directive';
import { MbsHeaderRightDirective } from './mbs-header-right.directive';


@NgModule({
    declarations: [
        MbsHeaderComponent,
        MbsHeaderLogoDirective,
        MbsHeaderLeftDirective,
        MbsHeaderCenterDirective,
        MbsHeaderRightDirective
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatToolbarModule,
    ],
    exports: [
        MbsHeaderComponent
    ]
})
export class MbsHeaderModule 
{ 
    
}
