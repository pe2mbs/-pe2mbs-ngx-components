import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxCrudTableComponent } from './ngx-crud-table.component';
import { NgxCrudFilterDialog } from './ngx-filter.dialog';
import { NgxCrudFilterDirective } from './ngx-filter.directive';
import { NgxCrudTableResizeDirective } from './ngx-resize.directive';
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


@NgModule({
    declarations: [
        NgxCrudTableComponent,
        NgxCrudFilterDialog,
        NgxCrudFilterDirective,
        NgxCrudTableResizeDirective,
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
        MatDialogModule
    ],
    exports: [
        NgxCrudTableComponent,
        NgxCrudFilterDialog,
        NgxCrudFilterDirective,
        NgxCrudTableResizeDirective,
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
export class NgxCrudTableModule { }

