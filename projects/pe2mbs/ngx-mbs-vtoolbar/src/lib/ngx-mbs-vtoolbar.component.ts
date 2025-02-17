import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'mbs-vtoolbar',
    template: `<div class="vsidebar" [ngClass]="uiClass">
      <ng-content></ng-content>
</div>
    `,
    styles: [ `
.vsidebar 
{
    display: block;

    &.orientation-left
    {
        float: left;
        height: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        
        &.material
        {
            width: 42px;
        }

        &.regular
        {
            width: 32px;
        }
    }
    &.orientation-right
    {
        float: right;
        height: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 1px;
        padding-right: 1px;
        &.material
        {
            width: 42px;
        }

        &.regular
        {
            width: 32px;
        }
    }
    &.orientation-top
    {
        float: top;
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
        &.material
        {
            height: 42px;
        }

        &.regular
        {
            height: 32px;
        }
      
    }
    &.orientation-bottom
    {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
        &.material
        {
            height: 42px;
        }

        &.regular
        {
            height: 32px;
        } 
    }
}
` ]
})
export class MbsVtoolbar implements OnInit 
{
    @Input()    color: string | undefined;
    @Input()    orientation: 'left' | 'right' | 'top' | 'bottom' = 'right';
    @Input()    mode: 'regular' | 'material' = 'regular';
    public      uiClass: string = '';

    constructor() 
    { 
        return;
    }

    public ngOnInit(): void 
    {
        this.uiClass += " color-" + this.color  
        this.uiClass += " orientation-" + this.orientation      
        this.uiClass += " " + this.mode;      
        return;
    }
}


@Component({
    selector: 'mbs-icon-button',
    template: `<button class="btn" [ngClass]="uiClass" (click)="onClick( $event )">
    <ng-content></ng-content>
</button>`,
    styles: [ `
.btn 
{
    border-radius:    10px;
    border:           none; /* Remove borders */
    padding:          3px 3px; /* Some padding */
    font-size:        12px; /* Set a font size */
    cursor:           pointer; /* Mouse pointer on hover */
    // transition:       0.1s all;
}

// .btn:active
// {
//     transform:        scale(0.3);
//     box-shadow:       3px 2px 22px 1px rgba(0, 0, 0, 0.24);
// }
` ]
} )
export class MbsToolButton implements OnInit 
{
    @Input()  color: string | undefined;

    @Output() click: EventEmitter<any>  = new EventEmitter<any>();
    @HostBinding('attr.click')  public clickSet: any;

    public      uiClass: string = '';

    constructor()
    {
        return;
    }

    public ngOnInit(): void 
    {
        this.uiClass += " color-" + this.color;
        return;
    }

    public onClick( $event: any ): void
    {
        if ( this.clickSet )
        {
            this.click.emit( $event );
        }
        return;
    }
}
