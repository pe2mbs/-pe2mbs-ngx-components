import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
import { TreeNode } from './tree-node.model';



const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes


@Injectable()
export class TreeVirtualScroll 
{
    private _dispose: any;

    @observable yBlocks         = 0;
    @observable x               = 0;
    @observable viewportHeight  = 0;
    viewport: any | null= null;

    @computed get y() 
    {
        return this.yBlocks * Y_EPSILON;
    }

    @computed get totalHeight() 
    {
        return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
    }

    constructor( private treeModel: TreeModel ) 
    {
        treeModel.virtualScroll = this;
        this._dispose = [autorun(() => this.fixScroll())];
        return;
    }

    public fireEvent( event: any ): void
    {
        this.treeModel.fireEvent(event);
        return;
    }

    public init(): void 
    {
        const fn = this.recalcPositions.bind( this );
        fn();
        this._dispose = [
            ...this._dispose,
            reaction(() => this.treeModel.roots, fn),
            reaction(() => this.treeModel.expandedNodeIds, fn),
            reaction(() => this.treeModel.hiddenNodeIds, fn)
        ];
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
        return;
    }

    public isEnabled(): boolean 
    {
        return this.treeModel.options.useVirtualScroll;
    }

    @action private _setYBlocks( value: number ): void
    {
        this.yBlocks = value;
        return;
    }

    @action recalcPositions(): void
    {
        let nodes: any[] = this.treeModel.getVisibleRoots();
        this.treeModel.virtualRoot.height = this._getPositionAfter( nodes, 0 );
        return;
    }

    private _getPositionAfter( nodes: TreeNode[], startPos: number ): number
    {
        let position = startPos;
        nodes.forEach(( node ) => {
            node.position = position;
            position = this._getPositionAfterNode(node, position);
        } );
        return ( position );
    }

    private _getPositionAfterNode( node: TreeNode, startPos: number ) 
    {
        let position = node.getSelfHeight() + startPos;
        if ( node.children && node.isExpanded ) // TBD: consider loading component as well
        {
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return ( position );
    }


    public clear(): void 
    {
        this._dispose.forEach( ( d: Function ) => d() );
        return;
    }

    @action setViewport( viewport: any ): void
    {
        Object.assign( this, {
            viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
        } );
        return;
    }

    @action scrollIntoView( node: any, force: boolean, scrollToMiddle: boolean = true )  
    {
        if ( node.options.scrollContainer ) 
        {
            const scrollContainer = node.options.scrollContainer;
            const scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
            const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
            const nodeTop = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;
            if ( force || // force scroll to node
                  nodeTop < scrollContainer.scrollTop || // node is above scroll container
                  nodeTop + node.getSelfHeight() > scrollContainer.scrollTop + scrollContainerHeight ) // node is below container
            {
                scrollContainer.scrollTop = scrollToMiddle ? nodeTop - scrollContainerHeight / 2 : // scroll to middle
                                                             nodeTop; // scroll to start
            }
        } 
        else 
        {
            if ( force || // force scroll to node
                  node.position < this.y || // node is above viewport
                  node.position + node.getSelfHeight() > this.y + this.viewportHeight) // node is below viewport
            {
                if ( this.viewport ) 
                {
                    this.viewport.scrollTop = scrollToMiddle ?
                    node.position - this.viewportHeight / 2 : // scroll to middle
                    node.position; // scroll to start

                    this._setYBlocks(Math.floor( this.viewport.scrollTop / Y_EPSILON ) );
                }
            }
        }
        return;
    }

    public getViewportNodes( nodes: TreeNode[] ): any[]
    {
        if ( !nodes )
        {
            return [];
        }
        const visibleNodes = nodes.filter( (node) => !node.isHidden );
        if (!this.isEnabled() ) 
        {
            return visibleNodes;
        }
        if (!this.viewportHeight || !visibleNodes.length ) 
        {
            return [];
        }

        // When loading children async this method is called before their height and position is calculated.
        // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
        // which means that it loops through every visibleNodes item and push them into viewportNodes array.
        // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
        const lastVisibleNode = visibleNodes.slice(-1)[0]
        if ( !lastVisibleNode.height && lastVisibleNode.position === 0 )  
        {
            return [];
        }

        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        const firstIndex = binarySearch( visibleNodes, (node:any) => {
            return (node.position + Y_OFFSET > this.y) || (node.position + node.height > this.y);
        });

        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        const lastIndex = binarySearch(visibleNodes, (node:any) => {
            return node.position - Y_OFFSET > this.y + this.viewportHeight;
        }, firstIndex);
        const viewportNodes = [];
        for ( let i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push( visibleNodes[ i ] ) ;
        }

        return ( viewportNodes );
    }

    fixScroll() 
    {
        const maxY = Math.max(0, this.totalHeight - this.viewportHeight);

        if (this.y < 0) this._setYBlocks(0);
        if (this.y > maxY) this._setYBlocks(maxY / Y_EPSILON);
    }
}

function binarySearch( nodes: TreeNode[], condition: any, firstIndex: number = 0 ): number
{
    let index = firstIndex;
    let toIndex = nodes.length - 1;
    while ( index !== toIndex ) 
    {
        let midIndex = Math.floor( ( index + toIndex ) / 2 );
        if ( condition( nodes[ midIndex ] ) ) 
        {
            toIndex = midIndex;
        }
        else 
        {
            if ( index === midIndex ) 
            {
                index = toIndex;
            }
            else 
            {
                index = midIndex; 
            }
        }
    }
    return ( index );
}
