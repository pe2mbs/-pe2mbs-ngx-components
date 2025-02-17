import { Directive, HostListener, ElementRef, Renderer2, Input, ComponentFactoryResolver, 
    Injector, ApplicationRef } from '@angular/core';
import { MbsMenuItem } from '../mbs-menuitem';
import { MbsSubMenuComponent } from './mbs-submenu.component';


@Directive({
    selector: '[mbsSubmenuDropOpen]',
})
export class MbsSubMenuDropOpenDirective 
{
    @Input( 'mbsSubmenuDropOpen' )  items!: Array<MbsMenuItem> | undefined; 
    @Input()                        mode: 'menubar' | 'submenu' = 'submenu'
    
    private ref:     any;
    private newNode: any;
    
    constructor( private el: ElementRef, 
                 private renderer: Renderer2,
                 private resolver: ComponentFactoryResolver,
                 private injector: Injector,
                 private app: ApplicationRef ) 
    { 
       return;
    }
    
    ngOnInit()
    {
        // console.log( 'node', this.mode, this.items );
        return;
    }

    @HostListener( 'mouseover' ) onMouseOver(): void 
    {
       if ( !this.ref && this.items && this.items.length > 0 )
       {
           const factory = this.resolver.resolveComponentFactory( MbsSubMenuComponent );
           this.newNode = this.renderer.createElement( 'div' );
           this.newNode.id = 'submenu';
           this.renderer.appendChild( this.el.nativeElement, this.newNode );
           const rect = this.el.nativeElement.getBoundingClientRect();            
           this.ref = factory.create( this.injector, [], this.newNode );
           this.ref.instance.items = this.items;
           this.app.attachView( this.ref.hostView );
           this.renderer.setStyle( this.newNode, 'position', 'relative' );
           if ( this.mode == 'submenu' )
           {
               this.renderer.setStyle( this.newNode, 'left', `${ rect.width }px` );
               this.renderer.setStyle( this.newNode, 'top', `-28px` );            
           }
           else
           {
               // pulldown menu
               const nodeRect = this.newNode.getBoundingClientRect()
               this.renderer.setStyle( this.newNode, 'top', `${ rect.height + 32 }px` );    
               this.renderer.setStyle( this.newNode, 'left', `5px` );                
           }
       }
       return;
    }
    
    @HostListener( 'mouseleave' ) onMouseLeave(): void 
    {
       if ( this.ref && this.items && this.items.length > 0 )
       {
           this.app.detachView( this.ref.hostView );
           delete this.ref;
           this.ref = null;
       }
       return;
    }
}
