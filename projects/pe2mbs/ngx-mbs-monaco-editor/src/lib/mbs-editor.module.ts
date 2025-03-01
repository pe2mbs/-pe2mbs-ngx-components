import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MBS_MONACO_EDITOR_CONFIG, MbsMonacoEditorConfig } from './mbs-config';
import { MbsDiffEditorComponent } from './mbs-diff-editor.component';
import { MbsEditorComponent } from './mbs-editor.component';


@NgModule( {
    declarations: [
        MbsEditorComponent,
        MbsDiffEditorComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        MbsEditorComponent,
        MbsDiffEditorComponent
    ]
})
export class MbsMonacoEditorModule 
{
    public static forRoot( config: MbsMonacoEditorConfig = {} ): ModuleWithProviders<MbsMonacoEditorModule> 
    {
        return {
            ngModule: MbsMonacoEditorModule,
            providers: [
                { provide: MBS_MONACO_EDITOR_CONFIG, 
                  useValue: config 
                }
            ]
        };
    }
}
