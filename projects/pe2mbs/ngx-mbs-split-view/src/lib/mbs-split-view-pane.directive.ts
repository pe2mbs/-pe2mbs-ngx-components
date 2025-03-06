import { Directive, Input, OnChanges, SimpleChanges, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";



@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[mbsSplitPane]'
})
export class MbsSplitPaneDirective implements OnChanges 
{
    @Input() splitRatio: number = 1;
    @Input() minSize: number    = 100;

    sizeChanges: Subject<void>  = new Subject<void>();
    minSizeChanges: Subject<void> = new Subject<void>();

    constructor( public readonly viewContainerRef: ViewContainerRef ) 
    {
        return;
    }

    public ngOnChanges( changes: SimpleChanges ): void 
    {
        if ( changes.splitRatio )  
        {
            this.sizeChanges.next();
        }
        if ( changes.minSize ) 
        {
            this.minSizeChanges.next();
        }
        return;
    }
}
