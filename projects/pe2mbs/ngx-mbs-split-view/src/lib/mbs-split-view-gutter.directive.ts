import { Directive, TemplateRef } from "@angular/core";


@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[mbsGutter]'
})
export class MbsSplitViewGutterDirective 
{
    constructor( public readonly template: TemplateRef<any> ) 
    {
        return;
    }
}
