import { Component, Input } from '@angular/core';

@Component({
    selector: 'mbs-footer',
    template: `<mat-toolbar [color]="color">
    <ng-content select="footer-left"></ng-content>
    <span class="spacer"></span>
    <ng-content select="footer-center"></ng-content>
    <span class="spacer"></span>
    <ng-content select="footer-right"></ng-content>
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
