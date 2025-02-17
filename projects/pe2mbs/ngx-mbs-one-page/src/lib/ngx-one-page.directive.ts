import { AfterViewInit, ContentChild, Directive, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';


@Directive({
    selector: '[mbsOnePage]'
})
export class MbsOnePageDirective implements OnDestroy, AfterViewInit
{
    @ContentChild( 'header_content', { static: true } )     header!: ElementRef;
    @ContentChild( 'window_content', { static: true } )    content!: ElementRef;
    @ContentChild( 'footer_content', { static: true } )     footer!: ElementRef;
    private observer_header: any;
    private observer_footer: any;

    constructor( private el: ElementRef, private renderer: Renderer2 ) 
    { 
        // This looks for changes in the header.
        this.observer_header = new ResizeObserver( entries => this._update() );
        // This looks for changes in the footer.
        this.observer_footer = new ResizeObserver( entries => this._update() );
        // This looks for resize event of the main window.
        window.addEventListener( 'resize', () => this._update() );
        return;
    }

    private _update(): void
    {
        let height = 0;     
        let tmp = 0;           
        if ( this.header )
        {
            tmp = this.header.nativeElement.getBoundingClientRect().height;
            // console.log( 'header', tmp );
            height += tmp;
        }
        if ( this.footer )
        {
            tmp = this.footer.nativeElement.getBoundingClientRect().height;
            // console.log( 'footer', tmp );
            height += tmp;
        }
        height = window.innerHeight - height;
        this.renderer.setStyle( this.content.nativeElement, 'height', `${ height }px` );
        return;
    }

    public ngOnDestroy(): void 
    {
        this.observer_header.disconnect();
        this.observer_footer.disconnect();
        return;
    }
     
    public ngAfterViewInit(): void 
    {
        if ( this.header.nativeElement )
        {
            this.observer_header.observe( this.header.nativeElement );
        }
        if ( this.footer.nativeElement )
        {
            this.observer_footer.observe( this.footer.nativeElement ); 
        }
        if ( !this.header.nativeElement && !this.footer.nativeElement )
        {
            console.error( "header or footer NOT initialized" );
        }
    }
}
