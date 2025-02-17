import { NgModule } from '@angular/core';
import { MbsToolButton, MbsVtoolbar } from './ngx-mbs-vtoolbar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        MbsVtoolbar,
        MbsToolButton,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatIconModule
    ],
    exports: [
        MbsVtoolbar,
        MbsToolButton
    ]
})
export class MbsVtoolbarModule 
{ 

}
