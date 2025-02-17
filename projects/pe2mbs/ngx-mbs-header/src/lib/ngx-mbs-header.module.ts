import { NgModule } from '@angular/core';
import { MbsHeaderComponent } from './ngx-mbs-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    declarations: [
        MbsHeaderComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatToolbarModule,
    ],
    exports: [
        MbsHeaderComponent
    ]
})
export class MbsHeaderModule { }
