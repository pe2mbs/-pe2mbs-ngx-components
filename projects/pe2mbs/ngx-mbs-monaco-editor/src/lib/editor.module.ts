import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from './config';
import { DiffEditorComponent } from './diff-editor.component';
import { EditorComponent } from './editor.component';

@NgModule( {
    declarations: [
        EditorComponent,
        DiffEditorComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        EditorComponent,
        DiffEditorComponent
    ]
})
export class MonacoEditorModule 
{
    public static forRoot( config: NgxMonacoEditorConfig = {} ): ModuleWithProviders<MonacoEditorModule> 
    {
        return {
            ngModule: MonacoEditorModule,
            providers: [
                { provide: NGX_MONACO_EDITOR_CONFIG, 
                  useValue: config 
                }
            ]
        };
    }
}

// removed Changes for angulur 19 
// export function provideMonacoEditor(config: NgxMonacoEditorConfig = {}) {
//   return makeEnvironmentProviders([
//     { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
//   ]);
// }
