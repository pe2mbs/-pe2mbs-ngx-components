import { NgModule } from '@angular/core';
import { MbsSplitViewComponent } from './mbs-split-view.component';
import { MbsSplitPaneDirective } from './mbs-split-view-pane.directive';
import { MbsSplitViewGutterDirective } from './mbs-split-view-gutter.directive';


@NgModule({
    declarations: [
        MbsSplitViewComponent,
        MbsSplitPaneDirective,
        MbsSplitViewGutterDirective,
    ],
    imports: [
    ],
    exports: [
        MbsSplitViewComponent,
        MbsSplitPaneDirective,
        MbsSplitViewGutterDirective,
    ]
})
export class MbsSplitViewModule 
{ 
    
}
