import { NgModule } from '@angular/core';
import { MbsNewsbarComponent } from './mbs-newsbar.component';
import { MbsNewsService } from './mbs-newsbar.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@NgModule( {
    declarations: [
        MbsNewsbarComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        MbsNewsbarComponent
    ],
    providers: [
        MbsNewsService,
    ]

} )
export class MbsNewsbarModule 
{ 
    
}
