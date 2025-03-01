import { ChangeDetectionStrategy, Component, Inject, Input, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';
import { MbsBaseEditor } from './mbs-base-editor';
import { MbsDiffEditorModel } from './mbs-types';
import { MBS_MONACO_EDITOR_CONFIG, MbsMonacoEditorConfig } from './mbs-config';


declare var monaco: any;


@Component({
    // removed Changes for angulur 19 
    // standalone: true,
    selector: 'mbs-monaco-diff-editor',
    template: '<div class="editor-container" #editorContainer></div>',
    styles: [`
      :host {
        display: block;
        height: 200px;
      }

      .editor-container {
        width: 100%;
        height: 98%;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbsDiffEditorComponent extends MbsBaseEditor 
{
    // private zone = inject(NgZone);
    _originalModel!: MbsDiffEditorModel;
    _modifiedModel!: MbsDiffEditorModel;

    @Input( 'options' ) set options( options: any ) 
    {
        this._options = Object.assign({}, this.config.defaultOptions, options );
        if ( this._editor ) 
        {
            this._editor.dispose();
            this.initMonaco( options, this.insideNg );
        }
        return;
    }

    get options(): any 
    {
        return ( this._options );
    }

    @Input( 'originalModel' ) set originalModel( model: MbsDiffEditorModel ) 
    {
        this._originalModel = model;
        if ( this._editor ) 
        {
            this._editor.dispose();
            this.initMonaco( this.options, this.insideNg );
        }
        return;
    }

    @Input( 'modifiedModel' ) set modifiedModel( model: MbsDiffEditorModel ) 
    {
        this._modifiedModel = model;
        if ( this._editor ) 
        {
            this._editor.dispose();
            this.initMonaco( this.options, this.insideNg );
        }
        return;
    }

    constructor( private zone: NgZone, @Inject( MBS_MONACO_EDITOR_CONFIG ) private editorConfig: MbsMonacoEditorConfig ) 
    {
        super( editorConfig );
        return;
    }

    protected initMonaco(options: any, insideNg: boolean): void 
    {
        if ( !this._originalModel || !this._modifiedModel ) 
        {
            throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
        }
        this._originalModel.language = this._originalModel.language || options.language;
        this._modifiedModel.language = this._modifiedModel.language || options.language;
        let originalModel = monaco.editor.createModel(this._originalModel.code, this._originalModel.language);
        let modifiedModel = monaco.editor.createModel(this._modifiedModel.code, this._modifiedModel.language);
        this._editorContainer.nativeElement.innerHTML = '';
        const theme = options.theme;
        if ( insideNg ) 
        {
            this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
        } 
        else 
        {
            this.zone.runOutsideAngular(() => {
                this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
            } )
        }
        options.theme = theme;
        this._editor.setModel( {
            original: originalModel,
            modified: modifiedModel
        } );
        // refresh layout on resize event.
        if ( this._windowResizeSubscription ) 
        {
            this._windowResizeSubscription.unsubscribe();
        }
        this._windowResizeSubscription = fromEvent( window, 'resize' ).subscribe( () => this._editor.layout() );
        this.onInit.emit( this._editor );
    }
}
