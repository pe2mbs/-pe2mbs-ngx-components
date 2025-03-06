import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCrudComponent } from './test-crud/test-crud.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { TestDiffEditorComponent } from './test-diff-editor/test-diff-editor.component';
import { TestTreeViewComponent } from './test-tree-view/test-tree-view.component';
import { TestSplitTreeViewComponent } from './test-split-tree-view/test-split-tree-view.component';


const routes: Routes = [
    {
        path: 'test-crud',
        component: TestCrudComponent
    },
    {
        path: 'test-editor',
        component: TestEditorComponent
    },
    {
        path: 'test-diff-editor',
        component: TestDiffEditorComponent
    },
    {
        path: 'test-tree',
        component: TestTreeViewComponent,
    },
    {
        path: 'test-split-tree',
        component: TestSplitTreeViewComponent,
    }
];


@NgModule({
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule]
})
export class AppRoutingModule 
{ 

}
