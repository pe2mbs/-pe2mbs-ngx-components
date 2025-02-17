import { Component, ElementRef, AfterViewInit, OnInit, OnDestroy, } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';


@Component({
    selector: 'tree-viewport',
    styles: [],
    providers: [TreeVirtualScroll],
    template: `<ng-container *treeMobxAutorun="{ dontDetach: true }">
<div [style.height]="getTotalHeight()"><ng-content></ng-content></div>
</ng-container>`
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy 
{
    setViewport = this.throttle(() => {
        this.virtualScroll.setViewport( this.elementRef.nativeElement );
    }, 1);

    private readonly scrollEventHandler: ($event: Event) => void;

    constructor( private elementRef: ElementRef, public virtualScroll: TreeVirtualScroll ) 
    {
        this.scrollEventHandler = this.setViewport.bind( this );
        return;
    }

    public ngOnInit(): void
    {
        this.virtualScroll.init();
        return;
    }

    public ngAfterViewInit(): void
    {
        setTimeout(() => {
            this.setViewport();
            this.virtualScroll.fireEvent( { eventName: TREE_EVENTS.initialized } );
        } );
        let el: HTMLElement = this.elementRef.nativeElement;
        el.addEventListener( 'scroll', this.scrollEventHandler );
        return;
    }

    public ngOnDestroy(): void 
    {
        this.virtualScroll.clear();
        let el: HTMLElement = this.elementRef.nativeElement;
        el.removeEventListener( 'scroll', this.scrollEventHandler );
        return;
    }

    public getTotalHeight(): string 
    {
        return ( ( this.virtualScroll.isEnabled() && this.virtualScroll.totalHeight + 'px') || 'auto' );
    }

    private throttle( func: any, timeFrame: any ): any
    {
        let lastTime = 0;
        return function () {
            let now = Date.now();
            if ( now - lastTime >= timeFrame ) 
            {
                func();
                lastTime = now;
            }
        };
    }
}
