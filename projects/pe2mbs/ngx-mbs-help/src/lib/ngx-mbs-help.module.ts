import { NgModule } from '@angular/core';
import { MbsHelpDialog } from './ngx-mbs-help.component';
import { MbsHelpService } from './ngx-mbs-help.service';



@NgModule({
    declarations: [
        MbsHelpDialog,
    ],
    imports: [
    ],
    exports: [
        MbsHelpDialog,
    ],
    providers:[
        MbsHelpService,
    ]
})
export class MbsHelpModule { }
