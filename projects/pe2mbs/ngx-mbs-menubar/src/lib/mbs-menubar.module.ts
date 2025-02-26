import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MbsMenuService } from './mbs-menubar.service';
import { MbsMenubarComponent } from './mbs-menubar.component';
import { MbsMenuItemComponent } from './menu-item/mbs-menu-item.component';
import { MbsPanelMenuItemComponent } from './panel-menu-item/mbs-panel-menu-item.component';
import { MbsPopupMenubarDirective } from './mbs-menubar-popup.directive';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
        MbsMenubarComponent,
        MbsMenuItemComponent,
        MbsPanelMenuItemComponent,
        MbsPopupMenubarDirective,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FontAwesomeModule,
        RouterModule,
    ],
    exports: [
        MbsMenubarComponent,        
        MbsMenuItemComponent,
        MbsPanelMenuItemComponent,
        MbsPopupMenubarDirective,
    ],
    providers: [
        MbsMenuService
    ]
})
export class MbsMenubarModule 
{ 
    constructor( library: FaIconLibrary, faConfig: FaConfig ) 
    {
        library.addIconPacks( fas, fab, far );
        return;
    }
}
