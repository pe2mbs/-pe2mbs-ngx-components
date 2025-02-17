import { NgModule } from '@angular/core';

import {
  SplitViewComponent,
  SplitPaneDirective,
  SplitViewGutterDirective
} from './split-view.component';

@NgModule({
  declarations: [
    SplitPaneDirective,
    SplitViewGutterDirective,
    SplitViewComponent
  ],
  exports: [
    SplitPaneDirective,
    SplitViewGutterDirective,
    SplitViewComponent
  ]
})
export class SplitViewModule { }
