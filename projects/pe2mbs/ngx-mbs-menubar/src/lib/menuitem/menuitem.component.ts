import { Component, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { MbsMenuItem } from '../mbs-menuitem';



@Component({
    selector: 'mbs-menu-item',
    template: `<li class="nav-item"><a class="nav-item" [href]="item.link">
    <i *ngIf="item.icon" [class]="'menu-icon fa ' + item.icon"></i><span>{{ item.caption }}</span>
    <i *ngIf="item.children && mode == 'menubar'; else popupmenu" class="menubar-icon fas fa-chevron-down"></i>
    <ng-template #popupmenu>
        <i *ngIf="item.children" class="menubar-icon fas fa-chevron-right"></i>
    </ng-template>
</a></li>`,
    styleUrls: ['./menuitem.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class MbsMenuItemComponent
{
    @Input() item!:    MbsMenuItem;
    @Input() mode:     'menubar' | 'submenu' = 'submenu';

    constructor( private el: ElementRef, private renderer: Renderer2 ) 
    {
        return;
    }
}
