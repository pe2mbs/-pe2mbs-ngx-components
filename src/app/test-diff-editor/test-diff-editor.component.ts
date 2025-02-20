import { Component, OnInit } from '@angular/core';
import { DiffEditorModel } from 'projects/pe2mbs/ngx-mbs-monaco-editor/src/public-api';

@Component({
  selector: 'app-test-diff-editor',
  templateUrl: './test-diff-editor.component.html',
  styleUrls: ['./test-diff-editor.component.scss']
})
export class TestDiffEditorComponent implements OnInit {
    options = {
        theme: 'vs-dark'
    };
    originalModel: DiffEditorModel = {
        code: 'heLLo world!',
        language: 'text/plain'
    };

    modifiedModel: DiffEditorModel = {
        code: 'hello orlando!',
        language: 'text/plain'
    };
    constructor() { }

    ngOnInit(): void {
    }

}
