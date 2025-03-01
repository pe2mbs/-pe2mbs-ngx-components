import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { MbsBaseEditor } from './mbs-base-editor';
import { MbsEditorModel } from './mbs-types';
import { MBS_MONACO_EDITOR_CONFIG, MbsMonacoEditorConfig } from './mbs-config';

declare var monaco: any;

@Component({
    // removed Changes for angulur 19 
    // standalone: true,
    selector: 'mbs-monaco-editor',
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MbsEditorComponent),
        multi: true
    }]
})
export class MbsEditorComponent extends MbsBaseEditor implements ControlValueAccessor 
{
    // private zone = inject(NgZone);
    private _value: string = '';

    propagateChange = (_: any) => {};
    onTouched = () => {};

    @Input( 'options' ) set options( options: any ) 
    {
        this._options = Object.assign({}, this.config.defaultOptions, options);
        if ( this._editor ) 
        {
            this._editor.dispose();
            this.initMonaco( options, this.insideNg );
        }
        return;
    }
    get options(): any 
    {
        return this._options;
    }

    @Input( 'model' ) set model( model: MbsEditorModel ) 
    {
        this.options.model = model;
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
    }

    public writeValue( value: any ): void 
    {
        this._value = value || '';
        // Fix for value change while dispose in process.
        setTimeout( () => {
            if ( this._editor && !this.options.model ) 
            {
                this._editor.setValue( this._value );
            }
        } );
        return;
    }

    public registerOnChange( fn: any ): void 
    {
        this.propagateChange = fn;
        return;
    }

    public registerOnTouched( fn: any ): void 
    {
        this.onTouched = fn;
        return;
    }

    protected initMonaco( options: any, insideNg: boolean ): void 
    {
        const hasModel = !!options.model;
        if ( hasModel ) 
        {
            const model = monaco.editor.getModel(options.model.uri || '');
            if ( model ) 
            {
                options.model = model;
                options.model.setValue(this._value);
            } 
            else 
            {
                options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
            }
        }
        if ( insideNg ) 
        {
            this._editor = monaco.editor.create( this._editorContainer.nativeElement, options );
        } 
        else 
        {
            this.zone.runOutsideAngular(() => {
                this._editor = monaco.editor.create( this._editorContainer.nativeElement, options );
            } )
        }
        if ( !hasModel ) 
        {
            this._editor.setValue(this._value);
        }

        this._editor.onDidChangeModelContent((e: any) => {
            const value = this._editor.getValue();
            // value is not propagated to parent when executing outside zone.
            this.zone.run( () => {
                this.propagateChange(value);
                this._value = value;
            } );
        });
        this._editor.onDidBlurEditorWidget(() => {
            this.onTouched(); 
        });
        // refresh layout on resize event.
        if ( this._windowResizeSubscription ) 
        {
            this._windowResizeSubscription.unsubscribe();
        }
        this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
        this.onInit.emit( this._editor );
        return;
    }
}
