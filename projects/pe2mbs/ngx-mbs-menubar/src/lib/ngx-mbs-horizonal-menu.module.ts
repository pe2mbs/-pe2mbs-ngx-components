import { NgModule } from '@angular/core';
import { MbsMenubarComponent } from './ngx-mbs-horizonal-menu.component';
import { MbsMenuItemComponent } from './menu-item/menu-item.component';
import { MbsPanelMenuItemComponent } from './panel-menu-item/panel-menu-item.component';
import { MbsMenuService } from './ngx-mbs-horizonal-menu.service';
import { MbsPopupMenubarDirective } from './popup-menubar.directive';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


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
        FontAwesomeModule,
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
