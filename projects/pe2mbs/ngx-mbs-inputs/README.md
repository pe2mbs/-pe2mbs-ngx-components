# NgxMbsInputs

## Text
    <mbs-text-input>
        <button mbsLeftInputButton mat-icon-button (click)="doAction( $event )">
            <mat-icon>pen</mat-icon>
        </button>
        <button mbsRightInputButton mat-icon-button (click)="doAction( $event )">
            <mat-icon>dots</mat-icon>
        </button>
        <div mbsInputError>
            <mat-hint>Errors appear instantly!</mat-hint>
            <mat-error *ngIf="emailFormControl.hasError( 'email' ) && !emailFormControl.     
                        hasError( 'required' )">
                Please enter a valid email address
            </mat-error>
            <mat-error *ngIf="emailFormControl.hasError( 'required' )">
                Email is <strong>required</strong>
            </mat-error>
        </div>
    </mbs-text-input>

## Number
    <mbs-number-input>
        ...
    </mbs-number-input>

## Choice list
    <mbs-choice-input>

    </mbs-choice-input>

## Combo box
    <mbs-combo-input>

    </mbs-combo-input>

## Check box
    <mbs-check-input>

    </mbs-check-input>

## E-Mail
    <mbs-email-input>

    </mbs-email-input>

## Password
    <mbs-password-input>

    </mbs-password-input>

## FileSelect
    <mbs-file-select-input>

    </mbs-file-select-input>

## Slider
    <mbs-slider-input>

    </mbs-slider-input>

## Slider
    <mbs-slider-toggle-input>

    </mbs-slider-toggle-input>

## Textarea
    <mbs-textarea-input>

    </mbs-textarea-input>

## Date
    <mbs-date-input>

    </mbs-date-input>

## Time
    <mbs-time-input>

    </mbs-time-input>

## DateTime
    <mbs-datetime-input>

    </mbs-datetime-input>

## Editor (monaco)
    <mbs-editor-input>
        <mbs-editor-toolbar>

        </mbs-editor-toolbar>
    </mbs-editor-input>



## Code scaffolding

Run `ng generate component component-name --project ngx-mbs-inputs` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-mbs-inputs`.
> Note: Don't forget to add `--project ngx-mbs-inputs` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-mbs-inputs` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-mbs-inputs`, go to the dist folder `cd dist/ngx-mbs-inputs` and run `npm publish`.

## Running unit tests

Run `ng test ngx-mbs-inputs` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
