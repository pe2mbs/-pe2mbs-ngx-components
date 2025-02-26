import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { QueryParamsHandling } from "@angular/router";


export interface IMbsMenuItem
{
    id:                     string;
    caption:                string;
    items?:                 IMbsMenuItem[];
    target?:                string;
    routerLink?:            string;
    icon?:                  string | IconProp;
    queryParams?:           any;
    fragment?:              string;
    queryParamsHandling?:   QueryParamsHandling;
    visible?:               boolean;
    isHeader?:              boolean;
    isChildVisible?:        boolean;
    x?:                     number | null;
    y?:                     number | null;
};

export type TMenuDirection = 'vertical' | 'horizontal' | 'alternate';


@Injectable()
export class MbsMenuItemBase
{
    protected _item: IMbsMenuItem | any;
    protected _onClickItem: EventEmitter<any> = new EventEmitter();

    constructor( protected router: Router )  
    { 
        return;
    }

    public get itemIcon(): IconProp
    {
        // console.log( 'itemIcon', this.item.iconCss );
        if ( typeof this._item.icon == 'string' )
        {
            return ( [ 'fas', this._item.icon.replace( 'fa-','' ) ] as IconProp );
        }
        else if ( this._item.icon )
        {
            return ( this._item.icon as IconProp );
        }
        return ( [ 'fas', 'home' ] as IconProp );
    }

    public onClick( menuItem: IMbsMenuItem ): void 
    {
        this._onClickItem.emit( menuItem );
        return;
    }

    public isActive( menuItem: IMbsMenuItem ): boolean 
    {
        if ( !menuItem.routerLink ) 
        {
            return ( false );
        }
        return ( this.router.isActive( menuItem.routerLink, { matrixParams: 'ignored', 
                                                              queryParams: 'ignored', 
                                                              paths: 'subset', 
                                                              fragment: 'ignored' } ) );
    }
}
