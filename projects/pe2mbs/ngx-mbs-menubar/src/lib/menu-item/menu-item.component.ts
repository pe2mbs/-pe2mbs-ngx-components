import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { IMbsMenuItem, MbsMenuItemBase, TMenuDirection } from "../ngx-mbs-base-item";


@Component({
    selector: "mbs-menu-item",
    templateUrl: "./menu-item.component.html",
    styleUrls: [ '../menubar.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MbsMenuItemComponent extends MbsMenuItemBase
{
    @Input() orientation: TMenuDirection = "vertical";
    @Input( 'item' ) set item( item: IMbsMenuItem ){ 
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
        return;
    }

    public onMouseEnter( $event: any, item: IMbsMenuItem ): void 
    {
        if ( this.orientation === "vertical" ) 
        {
            item.x = $event.target.offsetWidth;
            item.y = 0;
        } 
        else 
        {
            item.x = 0;
            item.y = $event.target.offsetHeight;
        }
        item.isChildVisible = true;
        return;
    }

    public onMouseLeave( item: IMbsMenuItem ): void 
    {
        item.isChildVisible = false;
        return;
    }
}
