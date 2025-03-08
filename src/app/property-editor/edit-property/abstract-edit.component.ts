import { EventEmitter } from "@angular/core";


export interface ICheckListItem
{
    checked:        boolean;
    label:          string;
};


export interface IPropertyItem
{
    label:          string
    type:           'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime' | 'array' | 'checklist'; 
    value:          string | number | boolean | Date | Array<string> | Array<ICheckListItem>;
    tooltip?:       string; 
    readonly?:      boolean;
    onChange:       EventEmitter<IPropertyItem>;

};


export abstract class InputComponent
{
    public item!:   IPropertyItem;
    public change!: EventEmitter<any>;
    public onChange( $event: any, item: IPropertyItem )
    {
      
    }

}