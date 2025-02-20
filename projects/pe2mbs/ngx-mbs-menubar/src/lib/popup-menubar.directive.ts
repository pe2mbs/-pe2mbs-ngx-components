import { Directive, HostListener, Input, AfterViewInit, ComponentRef, ElementRef,
         EventEmitter, Output, OnDestroy } from "@angular/core";
import { OverlayRef, Overlay, OverlayPositionBuilder } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { MbsMenubarComponent } from "./ngx-mbs-menubar.component";
import { Subscription } from "rxjs";
import { ConnectedPosition } from "@angular/cdk/overlay";
import { IMbsMenuItem } from "./ngx-mbs-base-item";


export const TopBottomOverlayPositions: ConnectedPosition[] = [
    {
        originX: "start",
        originY: "bottom",
        overlayX: "start",
        overlayY: "top",
    },
    {
        originX: "start",
        originY: "top",
        overlayX: "start",
        overlayY: "bottom",
    },
];

@Directive({
    selector: "[mbsPopupMenubar]",
})
export class MbsPopupMenubarDirective implements AfterViewInit, OnDestroy {
    private static controlCount = 1;

    @Input() items: IMbsMenuItem[] = [];
    @Input() styleClass: string = '';
    @Input() inputId: string = `app-popup-menubar_${MbsPopupMenubarDirective.controlCount++}`;

    @Output() onClickItem: EventEmitter<any> = new EventEmitter();

    private sub: Subscription = new Subscription();
    private overlayRef: OverlayRef | null = null;

    constructor( private overlay: Overlay, private overlayPositionBuilder: OverlayPositionBuilder,
                 private elementRef: ElementRef ) 
    { 
        return;
    }

    public ngAfterViewInit(): void 
    {
        this.elementRef.nativeElement.className = `${this.elementRef.nativeElement.className} app-menubar-target`.trim();
        const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo( this.elementRef )
                                                            .withPositions( TopBottomOverlayPositions );
        this.overlayRef = this.overlay.create( {
            positionStrategy,
            hasBackdrop: true,
            backdropClass: "app-menubar-backdrop",
            panelClass: "app-menubar-overlay",
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        } );
        this.sub.add( this.overlayRef.backdropClick().subscribe(() => this.close()) );
        this.sub.add( this.onClickItem.subscribe(() => {
            setTimeout(() => {
                this.close();
            }, 100);
        }) );
    }

    public ngOnDestroy(): void 
    {
        if ( this.overlayRef?.hasAttached() ) 
        {
            this.close();
        }
        this.sub.unsubscribe();
        return;
    }

    @HostListener( "click" ) show(): void 
    {
        if ( this.overlayRef?.hasAttached() ) 
        {
            this.close();
            return;
        }
        const menubarPortal = new ComponentPortal( MbsMenubarComponent );
        const menubarRef: ComponentRef<MbsMenubarComponent> | undefined = this.overlayRef?.attach(
            menubarPortal
        );
        if ( menubarRef != undefined )
        {
            menubarRef.instance.items           = this.items;
            menubarRef.instance.styleClass      = this.styleClass;
            menubarRef.instance.inputId         = this.inputId;
            menubarRef.instance.onClickItem     = this.onClickItem;
        }
        return;
    }

    protected close(): void 
    {
        this.overlayRef?.detach();
        return;
    }
}
