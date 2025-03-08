import { Component } from "@angular/core";
import { InputComponent } from "./abstract-edit.component";


@Component( { 
  selector: 'mbs-boolean-property',
  template: `<mat-form-field class="property-editor" [matTooltip]="item.tooltip || ''">
  <input type="boolean" [(ngModel)]="item.value" matInput 
                        (ngModelChange)="onChange( $event, item )" [readonly]="item.readonly">
</mat-form-field>`,
  styleUrls: [ './edit-property.component.scss' ]
} )
export class PropBooleanInputComponent extends InputComponent
{
  constructor()
  {
      super();
      return;
  }
}