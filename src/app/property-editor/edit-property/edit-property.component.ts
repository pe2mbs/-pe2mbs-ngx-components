import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MbsNumberInputComponent } from 'projects/pe2mbs/ngx-mbs-inputs/src/lib/mbs-number-input/mbs-number-input.component';
import { MbsTextInputComponent } from 'projects/pe2mbs/ngx-mbs-inputs/src/lib/mbs-text-input/mbs-text-input.component';


export interface ICheckListItem
{
    checked:  boolean;
    label:    string;
};


export interface IPropertyItem
{
    label: string
    type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime' | 'array' | 'checklist'; 
    value: string | number | boolean | Date | Array<string> | Array<ICheckListItem>;
    onChange: EventEmitter<IPropertyItem>;

};


@Component({
    selector:    'app-edit-property',
    templateUrl: './edit-property.component.html',
    styleUrls: [ './edit-property.component.scss' ]
})
export class EditPropertyComponent implements OnInit 
{
    @Input()    item!: IPropertyItem;
    
    public selectedPortal: Portal<any>;
    public componentPortal: ComponentPortal< MbsTextInputComponent >;

    constructor( private _viewContainerRef: ViewContainerRef )
    { 
        this.componentPortal = new ComponentPortal( MbsTextInputComponent );
        this.selectedPortal = this.componentPortal
        return;
    }

    public ngOnInit(): void 
    {
        if ( this.item.type == 'string' )
        {
            this.componentPortal = new ComponentPortal( MbsTextInputComponent );

          }
        else if ( this.item.type == 'number' )
        {
            this.componentPortal = new ComponentPortal( MbsNumberInputComponent );
            
        }
        this.selectedPortal = this.componentPortal
        return;
    }

}
