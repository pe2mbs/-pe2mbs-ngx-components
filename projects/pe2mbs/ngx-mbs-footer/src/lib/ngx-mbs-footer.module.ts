import { NgModule } from '@angular/core';
import { MbsFooterComponent } from './ngx-mbs-footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        MbsFooterComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatToolbarModule
    ],
    exports: [
        MbsFooterComponent
    ]
})
export class MbsFooterModule 
{ 
    
}
