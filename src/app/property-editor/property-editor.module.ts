import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropTextInputComponent } from './edit-property/text-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PropNumberInputComponent } from './edit-property/number-edit.component';
import { FormsModule } from '@angular/forms';
import { PropBooleanInputComponent } from './edit-property/boolean-text.component';
import { PropDateInputComponent } from './edit-property/date-text.component';
import { PropTimeInputComponent } from './edit-property/time-text.component';
import { PropDateTimeInputComponent } from './edit-property/datetime-text.component';
import { PropArrayInputComponent } from './edit-property/array-text.component';
import { PropCheckListInputComponent } from './edit-property/checklist-text.component';



@NgModule({
  declarations: [
      PropTextInputComponent,
      PropNumberInputComponent,
      PropBooleanInputComponent,
      PropDateInputComponent,
      PropTimeInputComponent,
      PropDateTimeInputComponent,
      PropArrayInputComponent,
      PropCheckListInputComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatTooltipModule,

  ]
})
export class PropertyEditorModule { }
