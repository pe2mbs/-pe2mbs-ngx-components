import { NgModule } from '@angular/core';
import { MbsFooterComponent } from './ngx-mbs-footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
    declarations: [
        MbsFooterComponent
    ],
    imports: [
        MatToolbarModule
    ],
    exports: [
        MbsFooterComponent
    ]
})
export class MbsFooterModule { }
