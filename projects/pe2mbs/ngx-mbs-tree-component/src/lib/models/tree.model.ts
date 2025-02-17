import { Injectable, OnDestroy } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { Subscription } from 'rxjs';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TreeVirtualScroll } from './tree-virtual-scroll.model';
import { ITreeModel, IDType, IDTypeDictionary, ITreeNode } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';


@Injectable()
export class TreeModel implements ITreeModel, OnDestroy 
{
    static focusedTree:             TreeModel | null    = null;
    public options:                 TreeOptions         = new TreeOptions();
    public nodes!:                  any[];
    public eventNames:              string[]            = Object.keys( TREE_EVENTS );
    public virtualScroll!:          TreeVirtualScroll;

    @observable roots!:             TreeNode[];
    @observable expandedNodeIds:    IDTypeDictionary    = {};
    @observable selectedLeafNodeIds: IDTypeDictionary   = {};
    @observable activeNodeIds:      IDTypeDictionary    = {};
    @observable hiddenNodeIds:      IDTypeDictionary    = {};
    @observable focusedNodeId:      IDType | null       = null;
    @observable virtualRoot!:       TreeNode;

    private firstUpdate:            boolean             = true;
    private events:                 any;
    private subscriptions: Subscription[]               = [];

    // events
    public fireEvent( event: any ) 
    {
        event.treeModel = this;
        this.events[ event.eventName ].emit( event );
        this.events.event.emit( event );
        return;
    }

    public subscribe( eventName: string, fn: Function ) 
    {
        const subscription = this.events[ eventName ].subscribe( fn );
        this.subscriptions.push( subscription );
        return;
    }


    // getters
    public getFocusedNode(): TreeNode | null
    {
        return ( this.focusedNode );
    }


    public getActiveNode(): TreeNode | null
    {
        return ( this.activeNodes[ 0 ] );
    }

    public getActiveNodes(): (TreeNode|null)[]
    {
        return ( this.activeNodes || [] );
    }

    public getVisibleRoots(): TreeNode[] 
    {
        return ( this.virtualRoot.visibleChildren );
    }

    public getFirstRoot( skipHidden: boolean = false ): TreeNode | null 
    {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[0] : null;
    }

    public getLastRoot( skipHidden: boolean = false ): TreeNode | null   
    {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return ( root != null && root.length ? root[root.length - 1] : null );
    }

    public get isFocused(): boolean 
    {
        return ( TreeModel.focusedTree === this );
    }

    public isNodeFocused( node: TreeNode ) 
    {
        return ( this.focusedNode === node );
    }

    public isEmptyTree(): boolean 
    {
        return ( this.roots && this.roots.length === 0 );
    }

    @computed get focusedNode(): TreeNode | null 
    {
        return ( this.focusedNodeId ? this.getNodeById( this.focusedNodeId ) : null );
    }

    @computed get expandedNodes(): ( TreeNode | null )[]
    {
        const nodes = Object.keys( this.expandedNodeIds ).filter( ( id ) => this.expandedNodeIds[ id ] ).map( ( id ) => this.getNodeById( id ) );
        return ( nodes.filter( Boolean ) );
    }

    @computed get activeNodes(): (TreeNode|null )[] 
    {
        const nodes = Object.keys( this.activeNodeIds ).filter( ( id ) => this.activeNodeIds[ id ] ).map( ( id ) => this.getNodeById( id ) );
        return ( nodes.filter( Boolean ) );
    }

    @computed get hiddenNodes() 
    {
        const nodes = Object.keys( this.hiddenNodeIds ).filter( ( id ) => this.hiddenNodeIds[ id ] ).map( ( id ) => this.getNodeById( id ) );
        return ( nodes.filter( Boolean ) );
    }

    @computed get selectedLeafNodes() 
    {
        const nodes = Object.keys( this.selectedLeafNodeIds ).filter( ( id ) => this.selectedLeafNodeIds[ id ] ).map( ( id ) => this.getNodeById( id ) );
        return ( nodes.filter(Boolean ) );
    }

    // locating nodes
    public getNodeByPath( path: any[], startNode: TreeNode | null = null ): TreeNode | ITreeNode| null
    {
        if ( !path ) 
        {
            return null;
        }
        startNode = startNode || this.virtualRoot;
        if ( path.length === 0 ) 
        {
            return ( startNode );
        }

        if ( startNode.children )  
        {
            const childId = path.shift();
            const childNode = startNode.children.find( c => c.id === childId );
            if ( !childNode ) 
            {
                return ( null );
            }
            return ( this.getNodeByPath( path, childNode ) );
        }
        return ( null );
    }

    public getNodeById( id: IDType ): TreeNode | null
    {
        const idStr = id.toString();
        return this.getNodeBy( ( node: TreeNode ) => node.id.toString() === idStr );
    }

    public getNodeBy( predicate: any, startNode: TreeNode | undefined | null = null ): null | TreeNode
    {
        startNode = startNode || this.virtualRoot;
        if ( !startNode.children ) 
        {
            return ( null );
        }
        const found = startNode.children.find( predicate );
        if ( found ) 
        { 
            // found in children
            return ( found as TreeNode );
        } 
        else 
        { 
            // look in children's children
            for ( let child of startNode.children ) 
            {
                const foundInChildren = this.getNodeBy( predicate, child );
                if ( foundInChildren )
                {
                    return ( foundInChildren );
                }
            }
        }
        return ( null );
    }

    public isExpanded( node: TreeNode ): boolean 
    {
        return ( this.expandedNodeIds[ node.id ] );
    }

    public isHidden( node: TreeNode ): boolean 
    {
        return ( this.hiddenNodeIds[ node.id ] );
    }

    public isActive( node: TreeNode ): boolean 
    {
        return ( this.activeNodeIds[ node.id ] );
    }

    public isSelected( node: TreeNode ): boolean 
    {
        return ( this.selectedLeafNodeIds[ node.id ] );
    }

    public ngOnDestroy(): void 
    {
        this.dispose();
        this.unsubscribeAll();
        return;
    }

    public dispose(): void 
    {
        // Dispose reactions of the replaced nodes
        if ( this.virtualRoot ) 
        {
            this.virtualRoot.dispose();
        }
        return;
    }

    public unsubscribeAll(): void 
    {
        this.subscriptions.forEach( subscription => subscription.unsubscribe() );
        this.subscriptions = [];
        return;
    }

    // actions
    @action setData({ nodes, options = null, events = null }: { nodes: any, options: any, events: any } ) 
    {
        if ( options ) 
        {
            this.options = new TreeOptions( options );
        }
        if ( events ) 
        {
            this.events = events;
        }
        if ( nodes ) 
        {
            this.nodes = nodes;
        }
        this.update();
        return ( { nodes, options, events } );
    }

    @action update(): void 
    {
        // Rebuild tree:
        let virtualRootConfig = {
            id: this.options.rootId,
            virtual: true,
            [ this.options.childrenField ]: this.nodes
        };
        this.dispose();
        this.virtualRoot = new TreeNode( virtualRootConfig, null, this, 0 );
        this.roots = this.virtualRoot.children;
        // Fire event:
        if ( this.firstUpdate ) 
        {
            if ( this.roots ) 
            {
                this.firstUpdate = false;
                this._calculateExpandedNodes();
            }
        } 
        else 
        {
            this.fireEvent( { eventName: TREE_EVENTS.updateData } );
        }
        return;
    }


    @action setFocusedNode( node: TreeNode | null ): void
    {
        this.focusedNodeId = node ? node.id : null;
        return;
    }

    @action setFocus( value: boolean ) 
    {
        TreeModel.focusedTree = value ? this : null;
        return
    }

    @action doForAll( fn: any ): void
    {
        this.roots.forEach( ( root ) => root.doForAll( fn ) );
        return;
    }

    @action focusNextNode() : void
    {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findNextNode( true, true ) : this.getFirstRoot( true );
        if ( nextNode ) 
        {
            nextNode.focus();
        }
        return;
    }

    @action focusPreviousNode(): void 
    {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findPreviousNode( true ) : this.getLastRoot( true );
        if ( nextNode ) 
        {
            nextNode.focus();
        }
        return;
    }

    @action focusDrillDown(): void 
    {
        let previousNode = this.getFocusedNode();
        if ( previousNode && previousNode.isCollapsed && previousNode.hasChildren ) 
        {
            previousNode.toggleExpanded();
        }
        else 
        {
            let nextNode = previousNode ? previousNode.getFirstChild( true ) : this.getFirstRoot( true );
            if ( nextNode ) 
            {
                nextNode.focus();
            }
        }
        return;
    }

    @action focusDrillUp(): void 
    {
        let previousNode = this.getFocusedNode();
        if ( !previousNode ) 
        {
            return;
        }
        if ( previousNode.isExpanded) 
        {
            previousNode.toggleExpanded();
        }
        else 
        {
            let nextNode = previousNode.realParent;
            if ( nextNode ) 
            {
                nextNode.focus();
            }
        }
        return;
    }

    @action setActiveNode( node: TreeNode, value: boolean, multi: boolean = false ): void
    {
        if ( multi ) 
        {
            this._setActiveNodeMulti( node, value );
        }
        else 
        {
            this._setActiveNodeSingle( node, value );
        }
        if ( value ) 
        {
            node.focus( this.options.scrollOnActivate );
            this.fireEvent( { eventName: TREE_EVENTS.activate, node } );
            this.fireEvent( { eventName: TREE_EVENTS.nodeActivate, node } ); // For IE11
        } 
        else 
        {
            this.fireEvent( { eventName: TREE_EVENTS.deactivate, node } );
            this.fireEvent( { eventName: TREE_EVENTS.nodeDeactivate, node } ); // For IE11
        }
        return;
    }

    @action setSelectedNode( node: TreeNode, value: boolean ): void
    {
        this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, { [ node.id ]: value } );
        if ( value ) 
        {
            node.focus();
            this.fireEvent({ eventName: TREE_EVENTS.select, node });
        } 
        else 
        {
            this.fireEvent({ eventName: TREE_EVENTS.deselect, node });
        }
        return;
    }

    @action setExpandedNode( node: TreeNode, value: boolean ): void
    {
        this.expandedNodeIds = Object.assign( {}, this.expandedNodeIds, { [ node.id ]: value }  );
        this.fireEvent( { eventName: TREE_EVENTS.toggleExpanded, node, isExpanded: value } );
        return;
    }

    @action expandAll(): void
    {
        // https://github.com/CirclonGroup/angular-tree-component/issues/938
        // The orinal call is very slow to update the view
        //      this.roots.forEach( ( root: TreeNode ) => root.expandAll() );
        // The improvement from the issue 
        this.expandedNodeIds = {};
        this.doForAll( (node: TreeNode) => {
            this.expandedNodeIds[node.id] = true;
            node.data.opened = true;

        });
        setTimeout(() => {
            this.update();
        });
        return;
    }

    @action collapseAll(): void
    {
        // https://github.com/CirclonGroup/angular-tree-component/issues/938
        // The orinal call is very slow to update the view
        //      this.roots.forEach( ( root: TreeNode ) => root.collapseAll() );
        // The improvement from the issue 
        this.expandedNodeIds = {};
        this.doForAll( (node: TreeNode) => {
            this.expandedNodeIds[node.id] = false;
            node.data.opened = false;
        });
        setTimeout(() => {
            this.update();
        });
        return
    }

    @action setIsHidden( node: TreeNode, value: boolean ): void
    {
        this.hiddenNodeIds = Object.assign( {}, this.hiddenNodeIds, { [ node.id ]: value } );
        return;
    }

    @action setHiddenNodeIds( nodeIds: any[] ): void 
    {
        this.hiddenNodeIds = nodeIds.reduce( ( hiddenNodeIds, id ) => Object.assign( hiddenNodeIds, {
            [id]: true
        } ), {} );
        return;
    }

    public performKeyAction( node: TreeNode, $event: any ): boolean 
    {
        if ( this.options && this.options.actionMapping && this.options.actionMapping.keys )
        {
            const keyAction = this.options.actionMapping.keys[ $event.keyCode ];
            if ( keyAction ) 
            {
                $event.preventDefault();
                keyAction( this, node, $event );
                return ( true );
            }
        } 
        return ( false );
    }

    @action filterNodes( filter: any, autoShow: boolean = true ): void
    {
        let filterFn: (node: TreeNode) => boolean;
        if ( !filter ) 
        {
            return this.clearFilter();
        }
        // support function and string filter
        if ( filter && typeof filter.valueOf() === 'string' ) 
        {
            filterFn = (node: TreeNode) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
        else if ( filter && typeof filter === 'function' ) 
        {
            filterFn = filter;
        }
        else 
        {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function');
            return;
        }
        const ids: any = {};
        this.roots.forEach( (node) => this._filterNode( ids, node, filterFn, autoShow ) );
        this.hiddenNodeIds = ids;
        this.fireEvent( { eventName: TREE_EVENTS.changeFilter } );
    }

    @action clearFilter() 
    {
        this.hiddenNodeIds = {};
        this.fireEvent( { eventName: TREE_EVENTS.changeFilter } );
        return;
    }

    @action moveNode( node: TreeNode, to: TreeNode ): void
    {
        const fromIndex: number           = node.getIndexInParent();
        const fromParent: TreeNode | null = node.parent;
        if ( !this.canMoveNode( node, to, fromIndex ) ) 
        {
            return;
        }
        if ( to.parent && fromParent )
        {
            const fromChildren = fromParent?.getField('children');
            // If node doesn't have children - create children array
            if ( !to.parent.getField( 'children' ) ) 
            {
                to.parent.setField( 'children', [] );
            }
            const toChildren = to.parent.getField( 'children' );
            const originalNode = fromChildren.splice(fromIndex, 1)[0];
            // Compensate for index if already removed from parent:
            let toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
            toChildren.splice(toIndex, 0, originalNode);
            fromParent.treeModel.update();
            if ( to.parent.treeModel !== fromParent.treeModel ) 
            {
                to.parent.treeModel.update();
            }

            this.fireEvent( {
                eventName: TREE_EVENTS.moveNode,
                node: originalNode,
                to:   { parent: to.parent.data, index: toIndex },
                from: { parent: fromParent.data, index: fromIndex }
            } );
        }
        return;
    }

    @action copyNode( node: TreeNode, to: TreeNode ) 
    {
        const fromIndex = node.getIndexInParent();

        if ( !this.canMoveNode( node, to, fromIndex ) ) 
        {
            return;
        }
        if ( to.parent )
        {
            // If node doesn't have children - create children array
            if ( !to.parent.getField( 'children' ) ) 
            {
                to.parent.setField('children', []);
            }
            const toChildren = to.parent.getField('children');
            const nodeCopy = this.options.getNodeClone(node);
            toChildren.splice(to.index, 0, nodeCopy);
            node.treeModel.update();
            if ( to.parent.treeModel !== node.treeModel ) 
            {
                to.parent.treeModel.update();
            }
            this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
        }
        return;
    }

    public getState(): any 
    {
        return { expandedNodeIds:     this.expandedNodeIds,
                 selectedLeafNodeIds: this.selectedLeafNodeIds,
                 activeNodeIds:       this.activeNodeIds,
                 hiddenNodeIds:       this.hiddenNodeIds,
                 focusedNodeId:       this.focusedNodeId };
    }

    @action setState(state: any ) 
    {
        if ( !state ) 
        {
            return;
        }
        Object.assign( this, {
            expandedNodeIds:          state.expandedNodeIds || {},
            selectedLeafNodeIds:      state.selectedLeafNodeIds || {},
            activeNodeIds:            state.activeNodeIds || {},
            hiddenNodeIds:            state.hiddenNodeIds || {},
            focusedNodeId:            state.focusedNodeId
        } );
        return;
    }

    public subscribeToState( fn: any ): void
    {
        autorun( () => fn( this.getState() ) );
        return;
    }

    public canMoveNode(node: TreeNode, to: TreeNode, fromIndex: number = -1 ) 
    {
        const fromNodeIndex = fromIndex == -1 ? node.getIndexInParent() : fromIndex;
        // same node:
        if ( node.parent === to.parent && fromIndex === to.index ) 
        {
            return false;
        }
        if ( to.parent )
        {
            return ( !to.parent.isDescendantOf( node ) );
        }
        return ( false );
    }

    public calculateExpandedNodes() 
    {
        this._calculateExpandedNodes();
    }

    // private methods
    private _filterNode( ids: any[], node: TreeNode, filterFn: any, autoShow: boolean ): boolean 
    {
        // if node passes function then it's visible
        let isVisible: boolean = filterFn(node);

        if ( node.children ) 
        {
            // if one of node's children passes filter then this node is also visible
            node.children.forEach(( child ) => {
                if (this._filterNode( ids, child, filterFn, autoShow ) ) 
                {
                    isVisible = true;
                }
            } );
        }

        // mark node as hidden
        if ( !isVisible ) 
        {
            ids[ node.id ] = true;
        }
        // auto expand parents to make sure the filtered nodes are visible
        if ( autoShow && isVisible ) 
        {
            node.ensureVisible();
        }
        return ( isVisible );
    }

    private _calculateExpandedNodes( startNode: TreeNode | null = null ): void
    {
        startNode = startNode || this.virtualRoot;
        if ( startNode.data[ this.options.isExpandedField ] ) 
        {
            this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, {[startNode.id]: true});
        }
        if ( startNode.children ) 
        {
            startNode.children.forEach( (child) => this._calculateExpandedNodes( child ) );
        }
        return;
    }

    private _setActiveNodeSingle( node: TreeNode, value: boolean ): void
    {
        // Deactivate all other nodes:
        this.activeNodes.filter( (activeNode) => activeNode !== node ).forEach((activeNode) => {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
        } );
        if ( value ) 
        {
            this.activeNodeIds = {[node.id]: true};
        }
        else 
        {
            this.activeNodeIds = {};
        }
        return;
    }

    private _setActiveNodeMulti( node: TreeNode, value: any ) 
    {
        this.activeNodeIds = Object.assign({}, this.activeNodeIds, { [ node.id ]: value } );
        return;
    }
}
