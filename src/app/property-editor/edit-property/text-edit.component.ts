import { Component } from "@angular/core";
import { InputComponent } from "./abstract-edit.component";



@Component( { 
    selector: 'mbs-text-property',
    template: `<mat-form-field class="property-editor" [matTooltip]="item.tooltip || ''">
    <input type="text" [(ngModel)]="item.value" matInput 
                        (ngModelChange)="onChange( $event, item )" [readonly]="item.readonly">
</mat-form-field>`,
    styleUrls: [ './edit-property.component.scss' ]
} )
export class PropTextInputComponent extends InputComponent
{
    constructor()
    {
        super();
        return;
    }
}