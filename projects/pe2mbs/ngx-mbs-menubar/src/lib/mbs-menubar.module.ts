import { NgModule } from '@angular/core';
import { MbsMenuBarComponent } from './menubar/mbs-menubar.component';
import { MbsMenuItemComponent } from './menuitem/menuitem.component';
import { MbsSubMenuComponent } from './submneu/mbs-submenu.component';
import { MbsSubMenuDropOpenDirective } from './submneu/mbs-submenu.directive';
import { MbsMenubarService } from './mbs-menubar.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        MbsMenuBarComponent,
        MbsMenuItemComponent,
        MbsSubMenuComponent,
        MbsSubMenuDropOpenDirective,
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        MbsMenuBarComponent,
        MbsMenuItemComponent,
        MbsSubMenuComponent,
        MbsSubMenuDropOpenDirective,
    ],
    providers: [
        MbsMenubarService,
    ]
})
export class MbsMenubarModule 
{

}
