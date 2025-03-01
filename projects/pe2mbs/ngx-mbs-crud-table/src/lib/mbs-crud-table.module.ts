/**
*   Angular 12 CRUD module for filtering, sorting and paging on backend.  
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
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MbsCrudTableComponent } from './mbs-crud-table.component';
import { MbsCrudFilterDialog } from './mbs-filter.dialog';
import { MbsCrudFilterDirective } from './mbs-filter.directive';
import { MbsCrudTableResizeDirective } from './mbs-resize.directive';
import { MbsColumnOptionsDialog } from './mbs-column.options.component';
import { MbsTableButton } from './mbs-table-button-component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MbsCrudHeaderTitleDirective, MbsCrudHeaderButtonDirective } from './mbs-crud-header.directive';
import { MbsCrudFooterTitleDirective, MbsCrudFooterButtonDirective } from './mbs-crud-footer.directive';
import { MbsCrudCellOptionDirective } from './mbs-crud-cell-option.directive';
import { MbsCrudDeleteButtonDirective } from './mbs-crud-delete-button.directive';


@NgModule({
    declarations: [
        MbsCrudTableComponent,
        MbsCrudFilterDialog,
        MbsCrudFilterDirective,
        MbsCrudTableResizeDirective,
        MbsColumnOptionsDialog,
        MbsTableButton,
        MbsCrudHeaderTitleDirective,
        MbsCrudHeaderButtonDirective,
        MbsCrudFooterTitleDirective,
        MbsCrudFooterButtonDirective,
        MbsCrudCellOptionDirective,
        MbsCrudDeleteButtonDirective,
    ],
    imports: [
        CommonModule,
        OverlayModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatTooltipModule,
        MatDialogModule
    ],
    exports: [
        MbsCrudTableComponent,
        MbsCrudFilterDialog,
        MbsCrudFilterDirective,
        MbsCrudTableResizeDirective,
        MbsColumnOptionsDialog,
        MbsTableButton,
    ],
    providers: [
        { 
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
            useValue: { appearance: 'fill' } 
        },
    ],
    schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA 
    ]
})
export class MbsCrudTableModule { }

