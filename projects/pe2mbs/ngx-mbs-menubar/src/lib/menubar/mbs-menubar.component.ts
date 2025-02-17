import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MbsMenuItem } from '../mbs-menuitem';
import { MbsMenubarService } from '../mbs-menubar.service';



@Component({
    selector: 'mbs-menubar',
    templateUrl: './mbs-menubar.component.html',
    styleUrls: [ './mbs-menubar.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class MbsMenuBarComponent implements OnInit
{
    @Input()    items:       Array<MbsMenuItem> = [];
        
    constructor( private service: MbsMenubarService ) 
    {
        return;
    }

    public ngOnInit(): void 
    {
        this.service.getMenu().subscribe( (menu: Array<MbsMenuItem>) => { 
            this.items = menu;
        } );
        return;
    }
}
