import { Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { ITreeOptions } from '../defs/api';
import { TreeViewportComponent } from './tree-viewport.component';

@Component({
  selector: 'Tree, tree-root',
  providers: [TreeModel],
  styles: [],
  template: `
      <tree-viewport #viewport>
          <div class="angular-tree-component" [class.node-dragging]="treeDraggedElement.isDragging()"
                                              [class.angular-tree-component-rtl]="treeModel.options.rtl">
                <tree-node-collection *ngIf="treeModel.roots" [nodes]="treeModel.roots" [treeModel]="treeModel" [templates]="{
            loadingTemplate: loadingTemplate,treeNodeTemplate: treeNodeTemplate, treeNodeWrapperTemplate: treeNodeWrapperTemplate,treeNodeFullTemplate: treeNodeFullTemplate}">
                </tree-node-collection>
                <tree-node-drop-slot class="empty-tree-drop-slot" *ngIf="treeModel.isEmptyTree()" [dropIndex]="0" [node]="treeModel.virtualRoot">
                </tree-node-drop-slot>
          </div>
      </tree-viewport>
  `
})
export class TreeComponent implements OnChanges 
{
    protected _nodes!:    any[];
    protected _options!:  TreeOptions;

    @ContentChild( 'loadingTemplate', { static: false }) loadingTemplate!: TemplateRef<any>;
    @ContentChild( 'treeNodeTemplate', { static: false }) treeNodeTemplate!: TemplateRef<any>;
    @ContentChild( 'treeNodeWrapperTemplate', { static: false }) treeNodeWrapperTemplate!: TemplateRef<any>;
    @ContentChild( 'treeNodeFullTemplate', { static: false }) treeNodeFullTemplate!: TemplateRef<any>;
    @ViewChild( 'viewport', { static: false }) viewportComponent!: TreeViewportComponent;

    // Will be handled in ngOnChanges
    @Input() set nodes(nodes: any[] ) 
    {
        return;
    };

    @Input() set options(options: ITreeOptions) 
    {
        return;
    };

    @Input() set focused( value: boolean ) 
    {
        this.treeModel.setFocus( value );
        return;
    }

    @Input() set state( value: any ) 
    {
        this.treeModel.setState( value );
        return;
    }

    @Output() toggleExpanded    = new EventEmitter<any>();
    @Output() activate          = new EventEmitter<any>();
    @Output() deactivate        = new EventEmitter<any>();
    @Output() nodeActivate      = new EventEmitter<any>();
    @Output() nodeDeactivate    = new EventEmitter<any>();
    @Output() select            = new EventEmitter<any>();
    @Output() deselect          = new EventEmitter<any>();
    @Output() focus             = new EventEmitter<any>();
    @Output() blur              = new EventEmitter<any>();
    @Output() updateData        = new EventEmitter<any>();
    @Output() initialized       = new EventEmitter<any>();
    @Output() moveNode          = new EventEmitter<any>();
    @Output() copyNode          = new EventEmitter<any>();
    @Output() loadNodeChildren  = new EventEmitter<any>();
    @Output() changeFilter      = new EventEmitter<any>();
    @Output() event             = new EventEmitter<any>();
    @Output() stateChange       = new EventEmitter<any>();

    constructor( public treeModel: TreeModel, public treeDraggedElement: TreeDraggedElement ) 
    {
        treeModel.subscribeToState(( state: any ) => this.stateChange.emit( state ) );
        return;
    }

    @HostListener( 'body: keydown', [ '$event' ] ) onKeydown( $event: any ) 
    {
        if ( !this.treeModel.isFocused ) 
        {
            return;
        }
        if ( ['input', 'textarea' ].includes( document.activeElement!.tagName.toLowerCase() ) ) 
        {
            return;
        }
        const focusedNode = this.treeModel.getFocusedNode();
        if (focusedNode )
        {
            this.treeModel.performKeyAction(focusedNode, $event);
        }
        return;
    }

    @HostListener( 'body: mousedown', [ '$event' ] ) onMousedown( $event: any ) 
    {
        function isOutsideClick( startElement: Element | null, nodeName: string ): boolean 
        {
            return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick( startElement.parentElement, nodeName );
        }

        if ( isOutsideClick($event.target, 'tree-root' ) ) 
        {
            this.treeModel.setFocus( false );
        }
        return;
    }

    public ngOnChanges( changes: SimpleChanges ) 
    {
        if (changes.options || changes.nodes) 
        {
            this.treeModel.setData( {
                options: changes.options && changes.options.currentValue,
                nodes: changes.nodes && changes.nodes.currentValue,
                events: this.pick(this, this.treeModel.eventNames)
            } );
        }
        return;
    }

    public sizeChanged(): void
    {
        this.viewportComponent.setViewport();
        return;
    }

    private pick( object: any, keys: string[] ): any
    {
        return ( keys.reduce( ( obj: any, key: string ) => {
            if ( object && object.hasOwnProperty( key ) ) 
            {
                obj[ key ] = object[ key ];
            }
            return ( obj );
        }, {} ) );
    }
}
