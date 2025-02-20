import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.scss']
})
export class TestEditorComponent implements OnInit 
{
    editorOptions = {theme: 'vs-dark', language: 'javascript'};
    code: string= 'function x() {\nconsole.log("Hello world!");\n}';

    constructor() 
    { 
        return;
    }

    ngOnInit(): void 
    {
        return;
    }

}
