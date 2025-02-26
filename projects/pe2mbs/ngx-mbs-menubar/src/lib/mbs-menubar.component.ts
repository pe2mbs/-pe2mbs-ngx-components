import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, Output,
         EventEmitter, AfterContentInit, OnDestroy, 
         OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { MbsMenuService } from "./mbs-menubar.service";
import { IMbsMenuItem, TMenuDirection } from "./mbs-base-item";


@Component({
    selector: "mbs-menubar",
    templateUrl: "./mbs-menubar.component.html",
    styleUrls: [ "./mbs-menubar.component.scss" ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MbsMenubarComponent implements OnInit, AfterContentInit, OnDestroy 
{
    private static controlCount = 1;
    
    @Input() orientation: TMenuDirection = 'horizontal';
    @Input() isPanelMenu: boolean = false;
    @Input() styleClass: string = '';
    @Input() inputId: string = `app-menubar_${MbsMenubarComponent.controlCount++}`;

    @Output() onClickItem: EventEmitter<any> = new EventEmitter();
    
    private sub: Subscription = new Subscription();
    public items: IMbsMenuItem[] = [];
    
    constructor( protected menuService: MbsMenuService )
    {
        return;
    }

    public ngOnInit(): void 
    {
        this.menuService.getMenu().subscribe( (data: IMbsMenuItem[]) => {
            this.items = data;
            console.log( 'data', data );
        } );
    }

    public ngAfterContentInit(): void 
    {
        if ( !this.isPanelMenu ) 
        {
            this.sub.add( this.onClickItem.subscribe(() => {
                this.items.forEach( ( element: IMbsMenuItem ) => {
                    if ( element.items ) 
                    {
                        this.collapseMenu( element );
                    }
                });
            } ) );
            this.orientation = this.orientation ? this.orientation : "horizontal";
        } 
        else 
        {
            this.orientation = 'horizontal';
        }
        return;
    }

    public collapseMenu( item: IMbsMenuItem ): void 
    {
        item.items?.forEach( ( element: IMbsMenuItem ) => {
            if ( element.items ) 
            {
                this.collapseMenu(element);
            }
        });
        item.isChildVisible = false;
        return;
    }

    public onClick( item: IMbsMenuItem ): void 
    {
        this.onClickItem.emit( item );
        return;
    }

    public ngOnDestroy(): void 
    {
        this.sub.unsubscribe();
        return;  
    }
}
