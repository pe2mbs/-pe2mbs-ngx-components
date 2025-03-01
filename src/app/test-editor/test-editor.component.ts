import { Component, OnInit } from '@angular/core';
import { MbsEditorModel } from 'projects/pe2mbs/ngx-mbs-monaco-editor/src/public-api';

@Component({
    selector:    'app-test-editor',
    templateUrl: './test-editor.component.html',
})
export class TestEditorComponent implements OnInit 
{
    public editorOptions: MbsEditorModel = { theme: 'vs-dark', 
                                             language: 'javascript', 
                                             value: '' };
    public code: string = 'function x() {\nconsole.log("Hello world!");\n}';

    constructor() 
    { 
        return;
    }

    public ngOnInit(): void 
    {
        return;
    }

}
