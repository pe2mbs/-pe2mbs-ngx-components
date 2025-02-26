import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { IMbsMenuItem, MbsMenuItemBase } from "../mbs-base-item";


@Component({
    selector: "mbs-panel-menu-item",
    templateUrl: "./mbs-panel-menu-item.component.html",
    styleUrls: [ '../mbs-menubar.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MbsPanelMenuItemComponent extends MbsMenuItemBase
{
    @Input() set item( item: IMbsMenuItem ){ 
        this._item = item; 
    } 
    get item(): IMbsMenuItem
    { 
        return ( this._item );
    };

    @Output() set onClickItem( event: EventEmitter<any> ){
        this._onClickItem = event;
        return;
    }
    get onClickItem(): EventEmitter<any> {
        return ( this._onClickItem );
    }

    constructor( router: Router )  
    { 
        super( router ); 
    }

    public onClickPanel( menuItem: IMbsMenuItem ): void 
    {
        menuItem.isChildVisible = !menuItem.isChildVisible;
        return;
    }
}
