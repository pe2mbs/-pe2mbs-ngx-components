import { observable, computed, reaction, autorun, action, IReactionDisposer } from 'mobx';
import { TreeModel } from './tree.model';
import { TreeOptions } from './tree-options.model';
import { ITreeNode } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';


export class TreeNode implements ITreeNode 
{
    private handler!: IReactionDisposer;
    @computed get isHidden() { return this.treeModel.isHidden(this); };

    @computed get isExpanded() { return this.treeModel.isExpanded(this); };

    @computed get isActive() { return this.treeModel.isActive(this); };

    @computed get isFocused() { return this.treeModel.isNodeFocused(this); };

    @computed get isSelected(): boolean 
    {
        if (this.isSelectable() ) 
        {
            return ( this.treeModel.isSelected(this) );
        } 
        return ( this.children.some((node: TreeNode) => node.isSelected) );
    };

    @computed get isAllSelected(): boolean 
    {
        if (this.isSelectable()) 
        {
            return this.treeModel.isSelected(this);
        } 
        return this.children.every((node: TreeNode) => node.isAllSelected);
    };

    @computed get isPartiallySelected() 
    {
        return this.isSelected && !this.isAllSelected;
    }

    @observable children!: TreeNode[];

    @observable index: number;

    @observable position = 0;

    @observable height!: number;

    @computed get level(): number 
    {
        return this.parent ? this.parent.level + 1 : 0;
    }

    @computed get path(): string[] 
    {
        return this.parent ? [...this.parent.path, this.id] : [];
    }

    get elementRef(): any {
        throw `Element Ref is no longer supported since introducing virtual scroll\n
               You may use a template to obtain a reference to the element`;
    }

    private _originalNode: any;

    get originalNode() { return this._originalNode; };

    constructor(public data: any, public parent: TreeNode| null, public treeModel: TreeModel, index: number) 
    {
        if ( this.id === undefined || this.id === null ) 
        {
            this.id = uuid();
        } // Make sure there's a unique id without overriding existing ids to work with immutable data structures
        this.index = index;
        if ( typeof data.opened == "boolean" )
        {
            this.treeModel.expandedNodeIds[ this.id ] = data.opened;
        }
        if ( typeof data.disabled == "boolean" )
        {
            this.treeModel.activeNodeIds[ this.id ] = !data.disabled;
        }
        if ( this.getField('children') ) 
        {
            this._initChildren();
        }
        this.autoLoadChildren();
        return;
    }

    // helper get functions:
    get hasChildren(): boolean 
    {
        return !!(this.getField('hasChildren') || (this.children && this.children.length > 0));
    }

    get isCollapsed(): boolean 
    { 
        return !this.isExpanded; 
    }

    get isLeaf(): boolean 
    { 
        return !this.hasChildren; 
    }

    get isRoot(): boolean 
    { 
        return this.parent?.data.virtual; 
    }

    get realParent(): TreeNode | null 
    { 
        return ( this.isRoot ? null : this.parent ); 
    }

    // proxy functions:
    get options(): TreeOptions 
    { 
        return this.treeModel.options; 
    }

    public fireEvent( event: any ) 
    { 
        this.treeModel.fireEvent(event); 
    }

    // field accessors:
    get displayField() 
    {
        return this.getField('display');
    }

    get id() 
    {
        return ( this.getField('id') );
    }

    set id( value ) 
    {
        this.setField('id', value);
        return;
    }

    public getField( key: string ): any 
    {
        const option = (this.options as any)[ `${key}Field` ]
        return ( this.data[ option ] );
    }

    public setField( key: string, value: any ): void 
    {
        const option = (this.options as any)[ `${key}Field` ]
        this.data[ option ] = value;
        return;
    }

    // traversing:
    private _findAdjacentSibling( steps: number, skipHidden: boolean = false ) 
    {
        const siblings = this._getParentsChildren(skipHidden);
        const index = siblings.indexOf(this);
        return ( siblings.length > index + steps ? siblings[index + steps] : null );
    }

    findNextSibling( skipHidden: boolean = false ) 
    {
        return ( this._findAdjacentSibling( +1, skipHidden ) );
    }

    findPreviousSibling( skipHidden: boolean = false ): TreeNode | null
    {
        return ( this._findAdjacentSibling( -1, skipHidden ) );
    }

    getVisibleChildren(): TreeNode[]
    {
        return ( this.visibleChildren );
    }

    @computed get visibleChildren() 
    {
        return ( this.children || [] ).filter(( node ) => !node.isHidden );
    }

    public getFirstChild( skipHidden: boolean = false ): TreeNode | null
    {
        let children = skipHidden ? this.visibleChildren : this.children;
        return ( children != null && children.length ? children[0] : null );
    }

    public getLastChild( skipHidden = false ) 
    {
        let children = skipHidden ? this.visibleChildren : this.children;
        return ( children != null && children.length ? children[children.length - 1] : null );
    }

    public findNextNode( goInside: boolean = true, skipHidden: boolean = false ): TreeNode | null
    {
        return goInside && this.isExpanded && this.getFirstChild( skipHidden ) ||
               this.findNextSibling( skipHidden ) ||
               this.parent && this.parent.findNextNode(false, skipHidden);
    }

    public findPreviousNode( skipHidden: boolean = false ): TreeNode | null
    {
        let previousSibling = this.findPreviousSibling( skipHidden );
        if ( !previousSibling ) 
        {
            return ( this.realParent );
        }
        return ( previousSibling._getLastOpenDescendant( skipHidden ) );
    }

    protected _getLastOpenDescendant( skipHidden = false ): TreeNode 
    {
        const lastChild = this.getLastChild(skipHidden);
        return (this.isCollapsed || !lastChild) ? this : lastChild._getLastOpenDescendant(skipHidden);
    }

    private _getParentsChildren(skipHidden = false): TreeNode[] 
    {
        const children = this.parent && (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
        return children || [];
    }

    public getIndexInParent(skipHidden = false ): number 
    {
        return this._getParentsChildren(skipHidden).indexOf(this);
    }

    public isDescendantOf( node: TreeNode ): boolean 
    {
        if ( this === node ) 
        {
            return true;
        }
        return ( this.parent != null && this.parent.isDescendantOf( node ) );
    }

    public getNodePadding(): string 
    {
        return ( this.options.levelPadding * (this.level - 1) + 'px' );
    }

    public getClass(): string 
    {
        return [ this.options.nodeClass( this ), `tree-node-level-${ this.level }` ].join(' ');
    }

    public onDrop( $event: any ) 
    {
        this.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this, index: 0, dropOnNode: true }
        } );
    }

    public allowDrop = ( element: any, $event?: any ) => {
      return this.options.allowDrop(element, { parent: this, index: 0 }, $event);
    }

    public allowDragoverStyling = () => {
        return this.options.allowDragoverStyling;
    }

    public allowDrag(): boolean 
    {
        return ( this.options.allowDrag( this ) );
    }


    // helper methods:
    public loadNodeChildren(): Promise<any> 
    {
        if ( !this.options.getChildren ) 
        {
            return Promise.resolve(); // Not getChildren method - for using redux
        }
        return Promise.resolve( this.options.getChildren( this ) ).then( ( children: TreeNode[] )  => {
            if ( children )   
            {
                this.setField('children', children);
                this._initChildren();
                if (this.options.useTriState && this.treeModel.isSelected(this)) 
                {
                    this.setIsSelected(true);
                }
                this.children.forEach((child) => {
                    if (child.getField('isExpanded') && child.hasChildren) 
                    {
                        child.expand();
                    }
                } );
            } 
        } ).then( () => {
            this.fireEvent( {
                eventName: TREE_EVENTS.loadNodeChildren,
                node: this
            } );
        } );
    }

    public expand(): TreeNode 
    {
        if ( !this.isExpanded ) 
        {
            this.setIsExpanded( !this.isExpanded );
        }
        return ( this );
    }

    public collapse(): TreeNode 
    {
        if ( this.isExpanded ) 
        {
            this.setIsExpanded( !this.isExpanded );
        }
        return ( this );
    }

    public toggleExpanded(): TreeNode 
    {
        this.setIsExpanded( !this.isExpanded );
        return ( this );
    }

    public setIsExpanded( value: boolean ): TreeNode
    {
        if ( this.hasChildren ) 
        {
            this.treeModel.setExpandedNode( this, value );
        }
        return ( this );
    };

    public doForAll( fn: ( node: ITreeNode ) => any ): void
    {
        Promise.resolve( fn( this ) ).then( () => {
            if ( this.children )
            {
                this.children.forEach( ( child ) => child.doForAll( fn ) );
            }
        } );
        return;
    }

    public expandAll(): void 
    {
        this.doForAll( ( node ) => node.expand() );
        return;
    }

    public collapseAll(): void
    {
        this.doForAll( ( node ) => node.collapse() );
        return;
    }

    public ensureVisible(): TreeNode 
    {
        if ( this.realParent ) 
        {
            this.realParent.expand();
            this.realParent.ensureVisible();
        }
        return ( this );
    }

    public autoLoadChildren(): void
    {
        this.handler = reaction( () => {
            this.isExpanded;
        }, (isExpanded) => {
            if ( !this.children && this.hasChildren && isExpanded ) 
            {
                this.loadNodeChildren();
            }
        }, { fireImmediately: true } );
        return;
    }

    public dispose(): void
    {
        if ( this.children ) 
        {
            this.children.forEach( ( child ) => child.dispose() );
        }
        if ( this.handler ) 
        {
            this.handler();
        }
        this.parent = null;
        this.children = [];
        return;
    }

    public setIsActive( value: boolean, multi = false ): TreeNode 
    {
        this.treeModel.setActiveNode( this, value, multi );
        if ( value ) 
        {
            this.focus( this.options.scrollOnActivate );
        }
        return ( this );
    }

    public isSelectable(): boolean 
    {
        return ( this.isLeaf || !this.children || !this.options.useTriState );
    }

    @action setIsSelected( value: boolean ): TreeNode 
    {
        if ( this.isSelectable() ) 
        {
            this.treeModel.setSelectedNode( this, value );
        } 
        else 
        {
            this.visibleChildren.forEach( (child) => child.setIsSelected(value) );
        }

        return ( this );
    }

    public toggleSelected(): TreeNode 
    {
        this.setIsSelected( !this.isSelected );
        return ( this );
    }

    public toggleActivated( multi = false ): TreeNode 
    {
        this.setIsActive( !this.isActive, multi );
        return ( this );
    }

    public setActiveAndVisible( multi: boolean = false ): TreeNode 
    {
        this.setIsActive( true, multi ).ensureVisible();
        setTimeout( this.scrollIntoView.bind( this ) );
        return ( this );
    }

    public scrollIntoView( force: boolean = false ): void
    {
        this.treeModel.virtualScroll.scrollIntoView( this, force );
        return;
    }

    public focus( scroll: boolean = true ): TreeNode
    {
        let previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode( this );
        if ( scroll ) 
        {
            this.scrollIntoView();
        }
        if ( previousNode ) 
        {
            this.fireEvent({ eventName: TREE_EVENTS.blur, node: previousNode });
        }
        this.fireEvent({ eventName: TREE_EVENTS.focus, node: this });
        return ( this );
    }

    public blur(): TreeNode 
    {
        let previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode( null );
        if (previousNode) 
        {
            this.fireEvent({ eventName: TREE_EVENTS.blur, node: this });
        }
        return ( this );
    }

    public setIsHidden( value: boolean ): void
    {
        this.treeModel.setIsHidden( this, value );
    }

    public hide(): void
    {
        this.setIsHidden( true );
    }

    public show(): void
    {
        this.setIsHidden( false );
    }

    public mouseAction( actionName: string, $event: any, data: any = null ): void 
    {
        this.treeModel.setFocus(true);

        const actionMapping: any = this.options.actionMapping.mouse;
        const mouseAction = actionMapping[ actionName ];
        if ( mouseAction ) 
        {
            mouseAction( this.treeModel, this, $event, data );
        }
        return;
    }

    public getSelfHeight(): number 
    {
      return ( this.options.nodeHeight( this ) );
    }

    @action _initChildren(): void
    {
        this.children = this.getField( 'children' ).map( ( c: any, index: number ) => new TreeNode( c, this, this.treeModel, index ) );
        return;
    }
}

function uuid(): number 
{
   return Math.floor(Math.random() * 10000000000000);
}
