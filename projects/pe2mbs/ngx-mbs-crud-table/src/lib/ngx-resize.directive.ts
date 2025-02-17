import { Directive, ElementRef, Input, AfterViewInit, Renderer2, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
  

@Directive( {
    selector: "[tableResize]",
} )
export class NgxCrudTableResizeDirective implements AfterViewInit, OnDestroy, OnInit
{
    /*
    *    This directive provide a resizing option to the mat-table
    *
    */ 

    @Input( "tableResize" )        enabled: boolean = true; 
    isFixed:                       boolean       = false;
    @Input() disabled:             boolean       = false;
    @Input() height:               number        = 32; 
    @Input() color:                string        = 'gray';
    @Input() widthColumns:         Array<string> = [];

    public table!:                 HTMLTableElement;

    private thCollection!:         HTMLCollectionOf<HTMLTableCellElement>;
    private th!:                   HTMLTableCellElement;
    private nextTh!:               HTMLTableCellElement;
    private index!:                number;
    private lineCollection:        HTMLDivElement[] = [];
    private width!:                number;
    private cursStartPos:          number         = 0;
    private nextWidth!:            number;
    private listeners:             Function[]     = [];
    private dragStart:             boolean        = false;
    private resizeObservable$!:    Observable<Event>
    private resizeSubscription$!:  Subscription
    
    constructor( private element: ElementRef, private renderer: Renderer2 ) 
    {
        return;
    }

    public ngOnInit(): void
    {
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
            console.log('event: ', evt );
            this.refresh();
        } );
        return;
    }
    
    public ngOnDestroy(): void 
    {
        this.resizeSubscription$.unsubscribe();
        return;
    }
  
    public ngAfterViewInit(): void 
    {
        if ( !this.disabled ) 
        {
            this.create();
        }
        return;
    }

    public refresh(): void 
    {
        // This needs to be called when the columns and resize event is triggered.
        for ( let i = 0; i < this.thCollection.length; i++ ) 
        {
            this.renderer.removeClass( this.thCollection[ i ], "resize-handle" );
        }
        this.thCollection   = this.table.getElementsByTagName( "th" );
        this.init();
        return;
    }
  
    public create(): void 
    {
        this.table          = this.element.nativeElement;
        this.thCollection   = this.table.getElementsByTagName( "th" );
        this.init();
        return;
    }

    private init(): void
    {
        if ( !this.enabled )
        {
            return;
        }
        this.lineCollection = [];
        if ( Array.isArray( this.widthColumns ) && this.widthColumns.length > 0 )
        {
            const parent = this.renderer.parentNode( this.table );
            const maxWidth = parent.clientWidth;
            let currentWidth = 0;
            let fixedWidth = 0;
            // Get the fixed column sizes
            this.widthColumns.forEach( (value, idx) => {
                if ( value.endsWith( 'px' ) )
                {
                    fixedWidth += +value.replace( 'px', '' );
                }
            } );
            this.widthColumns.forEach( (value, idx) => {
                if ( value.endsWith( 'px' ) )
                {
                    // Set the fixed column size
                    currentWidth += +value.replace( 'px', '' );
                }
                else
                {
                    // Calculate the column width based on the parent element width, minus the fixed column widths 
                    currentWidth += ((maxWidth - fixedWidth) / 100) * +value.replace( '%', '' );
                }

            } );
            currentWidth -= 10;    // Correction for the vertical scrollbar.
            this.renderer.setStyle( this.table, 'width', `${currentWidth}px` );
        }
        for ( let i = 0; i < this.thCollection.length; i++ ) 
        {
            if ( i !== this.thCollection.length - 1 ) 
            {
                const resizeHandle = document.createElement( "div" );
                this.setLineStyles( resizeHandle );
                this.renderer.addClass( resizeHandle, "resize-handle" );
                this.lineCollection.push( resizeHandle );
                this.renderer.appendChild( this.thCollection[ i ], resizeHandle );
                this.renderer.setStyle( this.thCollection[ i ], "position", "relative" );
            }
            let width: string | number;
            if ( this.isFixed && i === 0 ) 
            {
                width = "auto";
                this.setWidth( this.thCollection[ i ], "auto" );
            } 
            else 
            {
                width = Math.round( this.thCollection[ i ].getBoundingClientRect().width );
            }
            this.setWidth( this.thCollection[ i ], width );
        }
        const tableCellArr = Array.from( this.table.getElementsByTagName( "th" ) ).filter( ( v, i, arr ) => i !== arr.length - 1 );
        for ( let i = 0; i < tableCellArr.length; i++ ) 
        {
            this.renderer.listen(       this.lineCollection[ i ], "mousedown", this.mouseDown );
            this.renderer.setAttribute( this.lineCollection[ i ], "th-resize", `${ i }` );
        }
        return;
    }
   
    public setLineStyles( el: HTMLDivElement ): void 
    {
        this.renderer.setStyle( el, "position", "absolute");
        this.renderer.setStyle( el, "cursor", "e-resize");
        this.renderer.setStyle( el, "width", "6px" );
        this.renderer.setStyle( el, "right", "-3px" );
        this.renderer.setStyle( el, "top", "0" );
        this.renderer.setStyle( el, "z-index", "1" );    // For the sticky column this must be some z-index
        this.renderer.setStyle( el, "height", `${ this.height-2 }px` );
        this.renderer.setStyle( el, "background", this.color );
        this.renderer.setStyle( el, "position", "absolute" );
        return;
    }
  
    public setWidth( element: HTMLTableCellElement, width: number | string ): void 
    {
        this.renderer.setStyle( element, "width", width + (width === "auto" ? "" : "px") );
        return;
    }
  
    endDrag = (): void => {
        this.renderer.removeStyle(this.table.firstElementChild, "cursor");
        if ( this.dragStart ) 
        {
            this.dragStart = false;
        }
        this.listeners.forEach((fn) => fn());
        this.listeners = [];
        return;
    };
  
    mouseDown = (event: MouseEvent): void => 
    {
        const theadRow = this.table.firstElementChild;
        this.renderer.setStyle(theadRow, "cursor", "e-resize");
        const listenerMove = this.renderer.listen( theadRow, "mousemove", this.mouseMove );
        const listenerLeave = this.renderer.listen( theadRow, "mouseleave", this.endDrag );
        const listenerUp = this.renderer.listen(theadRow, "mouseup", this.endDrag);
        this.listeners.push(listenerMove, listenerLeave, listenerUp);
        const resize = event.target;
        this.index = parseInt( `${(resize as HTMLDivElement).getAttribute("th-resize")}` );
        this.th = this.thCollection[this.index];
        this.nextTh = this.thCollection[this.index + 1];
        this.dragStart = true;
        this.cursStartPos = event.pageX;
        this.width = parseInt( getComputedStyle( this.isFixed ? this.nextTh : this.th, null).getPropertyValue("width"), 10 );   
        if ( this.nextTh != undefined && !this.isFixed ) 
        {
            this.nextWidth = parseInt( getComputedStyle(this.nextTh, null).getPropertyValue("width"), 10 );
        }
        return;
    };
  
    public resizeFixed( cursorPosition: number, newWidth: number ) 
    {
        if ( !this.firstThLimit() && cursorPosition < this.cursStartPos ) 
        {
            return;
        } 
        else 
        {
            this.setWidth( this.nextTh, newWidth );
        }
        return;
    }
  
    public resize( newNextWidth: number, newWidth: number ) 
    {
        this.setWidth( this.th, newWidth );
        if ( this.nextTh != undefined ) 
        {
            this.setWidth(this.nextTh, newNextWidth);
        }
        return;
    }
  
    public firstThLimit(): boolean
    {
        const leftPd = parseInt( getComputedStyle( this.th, null ).getPropertyValue( "padding-left" ), 10 );
        const rightPd = parseInt( getComputedStyle( this.th, null ).getPropertyValue( "padding-right" ), 10 );
        const offset = leftPd + rightPd;
        return ( Math.round(this.thCollection[0].getBoundingClientRect().width) - offset > 60 );
    }
  
    mouseMove = (event: MouseEvent): void => {
        if ( this.dragStart ) 
        {
            const cursorPosition = event[ "pageX" ];
            const mouseMoved = cursorPosition - this.cursStartPos;
            const newWidth = this.isFixed ? this.width - mouseMoved : this.width + mouseMoved;
            let newNextWidth = this.nextWidth;
            if ( this.nextTh !== undefined && this.nextWidth !== undefined ) 
            {
                if (this.isFixed) 
                {
                    newNextWidth = -mouseMoved;
                } 
                else 
                {
                    newNextWidth = this.nextWidth - mouseMoved;
                }
            }
            if ( this.isFixed && newWidth && newWidth > 50 && this.isFixed ) 
            {
                this.resizeFixed(cursorPosition, newWidth);
            }
            if ( newWidth > 50 && ( newNextWidth > 50 || this.nextTh == undefined ) ) 
            {
                this.resize( newNextWidth, newWidth );
            }
        }
        return;
    };
}