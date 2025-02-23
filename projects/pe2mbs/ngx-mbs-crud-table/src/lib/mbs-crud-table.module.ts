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
import { MbsTableButton, MbsTableHelpButton } from './mbs-table-button-component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        MbsCrudTableComponent,
        MbsCrudFilterDialog,
        MbsCrudFilterDirective,
        MbsCrudTableResizeDirective,
        MbsColumnOptionsDialog,
        MbsTableButton,
        MbsTableHelpButton,
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
        MbsTableHelpButton,
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

