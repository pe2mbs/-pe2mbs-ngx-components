import { Component, Input } from '@angular/core';


@Component({
    selector: 'mbs-footer',
    template: `<mat-toolbar [color]="color">
    <ng-content select="[mbsFooterLeft],mbs-footer-left"></ng-content>
    <span class="spacer"></span>
    <ng-content select="[mbsFooterCenter],mbs-footer-center"></ng-content>
    <span class="spacer"></span>
    <ng-content select="[mbsFooterRight],mbs-footer-right"></ng-content>
</mat-toolbar>`,
    styles: [ `
.mat-toolbar 
{
    height: 32px;
}    
` ]
})
export class MbsFooterComponent
{
    @Input()    color!: string;
    
    constructor() 
    { 
        return;
    }
}
