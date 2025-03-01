import { NgModule } from '@angular/core';
import { MbsPasswordInputComponent } from './mbs-password-input/mbs-password-input.component';
import { MbsEmailInputComponent } from './mbs-email-input/mbs-email-input.component';
import { MbsNumberInputComponent } from './mbs-number-input/mbs-number-input.component';
import { MbsTextInputComponent } from './mbs-text-input/mbs-text-input.component';
import { MbsChoiceInputComponent } from './mbs-choice-input/mbs-choice-input.component';
import { MbsCheckboxInputComponent } from './mbs-checkbox-input/mbs-checkbox-input.component';
import { MbsComboboxInputComponent } from './mbs-combobox-input/mbs-combobox-input.component';
import { MbsLabelInputComponent } from './mbs-label-input/mbs-label-input.component';
import { MbsSliderInputComponent } from './mbs-slider-input/mbs-slider-input.component';
import { MbsSliderToggleInputComponent } from './mbs-slider-toggle-input/mbs-slider-toggle-input.component';
import { MbsTextareaInputComponent } from './mbs-textarea-input/mbs-textarea-input.component';
import { MbsMonacoInputComponent } from './mbs-monaco-input/mbs-monaco-input.component';
import { MbsDateInputComponent } from './mbs-date-input/mbs-date-input.component';
import { MbsDatetimeInputComponent } from './mbs-datetime-input/mbs-datetime-input.component';
import { MbsTimeInputComponent } from './mbs-time-input/mbs-time-input.component';
import { MbsFileUploadInputComponent } from './mbs-file-upload-input/mbs-file-upload-input.component';
import { MbsBaseInputComponent } from './mbs-base-input/mbs-base-input.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        MbsPasswordInputComponent,
        MbsEmailInputComponent,
        MbsNumberInputComponent,
        MbsTextInputComponent,
        MbsChoiceInputComponent,
        MbsCheckboxInputComponent,
        MbsComboboxInputComponent,
        MbsLabelInputComponent,
        MbsSliderInputComponent,
        MbsSliderToggleInputComponent,
        MbsTextareaInputComponent,
        MbsMonacoInputComponent,
        MbsDateInputComponent,
        MbsDatetimeInputComponent,
        MbsTimeInputComponent,
        MbsFileUploadInputComponent,
    ],
    imports: [
        MatInputModule
    ],
    exports: [
        MbsPasswordInputComponent,
        MbsEmailInputComponent,
        MbsNumberInputComponent,
        MbsTextInputComponent,
        MbsChoiceInputComponent,
        MbsCheckboxInputComponent,
        MbsComboboxInputComponent,
        MbsLabelInputComponent,
        MbsSliderInputComponent,
        MbsSliderToggleInputComponent,
        MbsTextareaInputComponent,
        MbsMonacoInputComponent,
        MbsDateInputComponent,
        MbsDatetimeInputComponent,
        MbsTimeInputComponent,
        MbsFileUploadInputComponent,
    ]
})
export class NgxMbsInputsModule 
{ 

}
