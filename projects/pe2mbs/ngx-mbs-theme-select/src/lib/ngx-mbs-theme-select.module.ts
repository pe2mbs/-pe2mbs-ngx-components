import { NgModule } from '@angular/core';
import { MbsThemeSelectComponent } from './ngx-mbs-theme-select.component';
import { MbsThemeSelectService } from './ngx-mbs-theme-select.service';
import { MbsThemeDirective } from './ngx-mbs-theme.directive';
import { MbsThemeManagerService } from './ngx-mbs-theme-manager.service';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    declarations: [
        MbsThemeSelectComponent,
        MbsThemeDirective,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MatRadioModule,
    ],
    exports: [
        MbsThemeSelectComponent,
        MbsThemeDirective,
    ],
    providers: [
        MbsThemeSelectService,
        MbsThemeManagerService,
    ],

})
export class MbsThemeSelectModule 
{ 

}
