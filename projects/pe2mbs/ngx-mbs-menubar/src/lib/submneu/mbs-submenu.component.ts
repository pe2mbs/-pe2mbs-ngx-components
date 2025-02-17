import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MbsMenuItem } from '../mbs-menuitem';


@Component({
    selector: 'mbs-sub-menu',
    templateUrl: './mbs-submenu.component.html',
    styleUrls: ['./mbs-submenu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MbsSubMenuComponent implements AfterViewInit 
{
    @ViewChild( 'dropdown_content' )    element: any;
    @Input()                            items!: Array<MbsMenuItem>;
    @Input()                            mode: string = 'menubar';

    constructor( private el: ElementRef, private renderer: Renderer2 ) 
    { 
        return;
    }

    public ngAfterViewInit(): void
    {
        const rect2 = this.element.nativeElement.getBoundingClientRect();
        // console.log( 'rect', rect2 );
        const rect = this.el.nativeElement.getBoundingClientRect();
        if ( rect.x + rect2.width > window.innerWidth )
        {
            this.renderer.setStyle( this.element.nativeElement, 'left', `-${ rect2.width - (rect.width+11) }px` );
            this.renderer.setStyle( this.element.nativeElement, 'top', `${ -36 }px` );
        }
        const rect3 = this.element.nativeElement.getBoundingClientRect();
        // console.log( 'rect', rect3 );
        return;
    }
}
