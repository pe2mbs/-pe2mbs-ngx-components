import { NgModule } from '@angular/core';
import { MbsFooterComponent } from './mbs-footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FooterLeftDirective } from './mbs-footer-left.directive';
import { FooterCenterDirective } from './mbs-footer-center.directive';
import { FooterRightDirective } from './mbs-footer-right.directive';


@NgModule({
    declarations: [
        MbsFooterComponent,
        FooterLeftDirective,
        FooterCenterDirective,
        FooterRightDirective
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatToolbarModule
    ],
    exports: [
        MbsFooterComponent,
        FooterLeftDirective,
        FooterCenterDirective,
        FooterRightDirective
    ]
})
export class MbsFooterModule 
{ 
    
}
