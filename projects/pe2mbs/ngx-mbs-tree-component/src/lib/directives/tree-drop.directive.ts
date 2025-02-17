import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnDestroy, Output, Renderer2 } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';


const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';


@Directive({
    selector: '[treeDrop]'
})
export class TreeDropDirective implements AfterViewInit, OnDestroy 
{
    @Input() allowDragoverStyling = true;
    @Output( 'treeDrop')            onDropCallback        = new EventEmitter();
    @Output( 'treeDropDragOver' )   onDragOverCallback    = new EventEmitter();
    @Output( 'treeDropDragLeave' )  onDragLeaveCallback   = new EventEmitter();
    @Output( 'treeDropDragEnter' )  onDragEnterCallback   = new EventEmitter();
  
    private readonly dragOverEventHandler:  ( ev: DragEvent ) => void;
    private readonly dragEnterEventHandler: ( ev: DragEvent ) => void;
    private readonly dragLeaveEventHandler: ( ev: DragEvent ) => void;

    private _allowDrop = ( element: any, $event: any ) => true;

    @Input() set treeAllowDrop( allowDrop: any ) 
    {
        if ( allowDrop instanceof Function ) 
        {
            this._allowDrop = allowDrop;
        }
        else 
        {
            this._allowDrop = (element, $event) => allowDrop;
        }
        return;
    }

    public allowDrop( $event: any ): boolean 
    {
        return ( this._allowDrop( this.treeDraggedElement.get(), $event ) );
    }

    constructor( private el: ElementRef, private renderer: Renderer2, private treeDraggedElement: TreeDraggedElement, private ngZone: NgZone ) 
    {
        this.dragOverEventHandler = this.onDragOver.bind(this);
        this.dragEnterEventHandler = this.onDragEnter.bind(this);
        this.dragLeaveEventHandler = this.onDragLeave.bind(this);
        return;
    }

    public ngAfterViewInit(): void 
    {
        let el: HTMLElement = this.el.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            el.addEventListener( 'dragover', this.dragOverEventHandler );
            el.addEventListener( 'dragenter', this.dragEnterEventHandler );
            el.addEventListener( 'dragleave', this.dragLeaveEventHandler );
        } );
        return;
    }

    public ngOnDestroy(): void 
    {
        let el: HTMLElement = this.el.nativeElement;
        el.removeEventListener( 'dragover', this.dragOverEventHandler );
        el.removeEventListener( 'dragenter', this.dragEnterEventHandler );
        el.removeEventListener( 'dragleave', this.dragLeaveEventHandler );
        return;
    }

    public onDragOver( $event: any ): void 
    {
        if ( !this.allowDrop( $event ) ) 
        {
            if ( this.allowDragoverStyling ) 
            {
                return this.addDisabledClass();
            }
            return;
        }
        this.onDragOverCallback.emit( { event: $event, element: this.treeDraggedElement.get() } );
        $event.preventDefault();
        if ( this.allowDragoverStyling ) 
        {
            this.addClass();
        }
        return;
    }

    public onDragEnter( $event: any ): void 
    {
        if ( !this.allowDrop( $event ) ) 
        {
            return;
        }
        $event.preventDefault();
        this.onDragEnterCallback.emit( { event: $event, element: this.treeDraggedElement.get() } );
        return;
    }

    public onDragLeave( $event: any ): void 
    {
        if (!this.allowDrop($event)) 
        {
            if (this.allowDragoverStyling) 
            {
                return this.removeDisabledClass();
            }
            return;
        }
        this.onDragLeaveCallback.emit( { event: $event, element: this.treeDraggedElement.get() } );
        if ( this.allowDragoverStyling ) 
        {
            this.removeClass();
        }
        return;
    }

    @HostListener( 'drop', [ '$event' ] ) onDrop( $event: any ): void 
    {
        if ( !this.allowDrop( $event ) ) 
        {
            return;
        }
        $event.preventDefault();
        this.onDropCallback.emit( { event: $event, element: this.treeDraggedElement.get() } );
        if ( this.allowDragoverStyling )
        {
            this.removeClass();
        }
        this.treeDraggedElement.set( null );
        return;
    }

    private addClass(): void 
    {
        this.renderer.addClass( this.el.nativeElement, DRAG_OVER_CLASS );
        return;
    }

    private removeClass(): void 
    {
        this.renderer.removeClass( this.el.nativeElement, DRAG_OVER_CLASS );
        return
    }

    private addDisabledClass(): void 
    {
        this.renderer.addClass( this.el.nativeElement, DRAG_DISABLED_CLASS );
        return;
    }

    private removeDisabledClass(): void 
    {
        this.renderer.removeClass( this.el.nativeElement, DRAG_DISABLED_CLASS );
        return;
    }
}
