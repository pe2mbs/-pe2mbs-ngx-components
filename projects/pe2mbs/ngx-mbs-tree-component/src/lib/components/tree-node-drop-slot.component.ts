import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';

@Component( {
    selector: 'TreeNodeDropSlot, tree-node-drop-slot',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `<div class="node-drop-slot" (treeDrop)="onDrop($event)" [treeAllowDrop]="allowDrop.bind(this)" [allowDragoverStyling]="true"></div>`
} )
export class TreeNodeDropSlot 
{
    @Input() node!:       TreeNode | null;
    @Input() dropIndex!:  number;

    public onDrop( $event: any ): void
    {
        if ( this.node ) 
        {
            this.node.mouseAction('drop', $event.event, {
                from: $event.element,
                to: { parent: this.node, index: this.dropIndex }
            });
        }
        return;
    }

    public allowDrop( element: any, $event: any ) 
    {
        if ( this.node ) 
        {
            return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex }, $event);
        }
        return ( false );
    }
}
