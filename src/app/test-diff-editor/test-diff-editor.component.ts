import { Component, OnInit } from '@angular/core';
import { MbsDiffEditorModel } from 'projects/pe2mbs/ngx-mbs-monaco-editor/src/public-api';

@Component({
    selector: 'app-test-diff-editor',
    templateUrl: './test-diff-editor.component.html',
})
export class TestDiffEditorComponent implements OnInit 
{
    public options = {
        theme:      'vs-dark'
    };

    public originalModel: MbsDiffEditorModel = {
        code:       'heLLo world!',
        language:   'text/plain'
    };

    public modifiedModel: MbsDiffEditorModel = {
        code:       'hello orlando!',
        language:   'text/plain'
    };

    constructor() 
    { 
        return;
    }

    public ngOnInit(): void 
    {
        return;
    }

}
