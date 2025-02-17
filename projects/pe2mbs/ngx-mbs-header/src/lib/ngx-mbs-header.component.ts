import { Component, Input, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'mbs-header',
    template: `<div><mat-toolbar [color]="color">
    <ng-content select="header-logo"> </ng-content>
    <ng-content select="header-title"></ng-content>
    <span class="spacer"></span>
    <ng-content select="header-right"></ng-content>
</mat-toolbar></div>`,
    styles: [ `
:host
{
    width: 100%;
    height: 60px;
}
.spacer 
{
    flex: 1 1 auto;
}` ],
    encapsulation: ViewEncapsulation.None
} )
export class MbsHeaderComponent
{
    @Input()  color: string = 'primary';

    constructor() 
    { 
        return;
    }
}
