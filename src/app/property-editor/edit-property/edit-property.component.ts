import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { InputComponent, IPropertyItem } from './abstract-edit.component';
import { PropTextInputComponent } from './text-edit.component';
import { PropNumberInputComponent } from './number-edit.component';
import { PropBooleanInputComponent } from './boolean-text.component';
import { PropDateInputComponent } from './date-text.component';
import { PropTimeInputComponent } from './time-text.component';
import { PropDateTimeInputComponent } from './datetime-text.component';
import { PropArrayInputComponent } from './array-text.component';
import { PropCheckListInputComponent } from './checklist-text.component';


@Component({
    selector:    'app-edit-property',
    templateUrl: './edit-property.component.html',
    styleUrls: [ './edit-property.component.scss' ]
})
export class EditPropertyComponent implements OnInit 
{
    @Input()    item!: IPropertyItem;
    @ViewChild( 'value_element', { read: ViewContainerRef, static: false } ) dynamicInsert?: ViewContainerRef;
    
    protected componentPortal: InputComponent | null      = null;

    constructor( private componentFactoryResolver: ComponentFactoryResolver )
    { 
        return;
    }
    
    public createComponent( obj: any ): InputComponent 
    {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory( PropTextInputComponent );
        const component: InputComponent = <InputComponent>this.dynamicInsert?.createComponent( componentFactory ).instance;
        component.item = this.item;
        component.change = this.item.onChange;
        return ( component );
    }

    public ngOnInit(): void 
    {
        if ( this.item.type == 'string' )
        {
            this.componentPortal = this.createComponent( PropTextInputComponent );
        }
        else if ( this.item.type == 'number' )
        {
            this.componentPortal = this.createComponent( PropNumberInputComponent );
        }
        else if ( this.item.type == 'boolean' )
        {
            this.componentPortal = this.createComponent( PropBooleanInputComponent );  
        }
        else if ( this.item.type == 'date' )
        {
            this.componentPortal = this.createComponent( PropDateInputComponent );  
        }
        else if ( this.item.type == 'time' )
        {
            this.componentPortal = this.createComponent( PropTimeInputComponent );  
        }
        else if ( this.item.type == 'datetime' )
        {
            this.componentPortal = this.createComponent( PropDateTimeInputComponent );  
        }
        else if ( this.item.type == 'array' )
        {
            this.componentPortal = this.createComponent( PropArrayInputComponent );  
        }
        else if ( this.item.type == 'checklist' )
        {
            this.componentPortal = this.createComponent( PropCheckListInputComponent );  
        } 
        return;
    }

}
