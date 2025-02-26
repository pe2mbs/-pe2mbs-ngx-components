import { NgModule } from '@angular/core';
import { MbsHelpDialog } from './mbs-help.component';
import { MbsHelpService } from './mbs-help.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MbsHelpDirective } from './mbs-help.directive';


@NgModule({
    declarations: [
        MbsHelpDialog,
        MbsHelpDirective,
    ],
    exports: [
        MbsHelpDialog,
        MbsHelpDirective,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatButtonModule,
        MatIconModule
    ],
    providers:[
        MbsHelpService,
    ]
})
export class MbsHelpModule 
{ 
    
}
