/**
 * Welcome to ng2tree
 */
export type IDType = string | number;
export type IDTypeDictionary = { [id: string]: boolean, [id: number]: boolean };

/**
 * See ITreeNode for documentation
 */
export declare type TreeNode = any;


export interface IAllowDropFn 
{
    (element: any, to: {parent: TreeNode, index: number}, $event?: any): boolean;
}


export interface INodeHeightFn 
{
    (node: TreeNode): number;
}


export interface IAllowDragFn 
{
    (node: TreeNode): boolean;
}


export interface ITreeState 
{
    expandedNodeIds?: IDTypeDictionary;
    selectedNodeIds?: IDTypeDictionary;
    activeNodeIds?: IDTypeDictionary;
    hiddenNodeIds?: IDTypeDictionary;
    selectedLeafNodeIds?: IDTypeDictionary;
    focusedNodeId?: IDType;
}


export interface ITreeOptions 
{
   /**
    * A string representing the attribute of the node that indicates whether there are child nodes.

    * **Default value: `hasChildren`.**

    For example, if your nodes have an `isDirectory` attribute that indicates whether there are children, use:
    ```
      options = { hasChildrenField: 'isDirectory' }
    ```
    */
   hasChildrenField?: string;
   /**
    * A string representing the attribute of the node that contains the array of children.

    * **Default value: `children`.**

    For example, if your nodes have a `nodes` attribute, that contains the children, use:
    ```
      options = { childrenField: 'nodes' }
    ```
    */
   childrenField?: string;
   /**
    * A string representing the attribute of the node to display.

    * **Default value: `name`**

      For example, if your nodes have a `title` attribute that should be displayed, use:
      ```
        options = { displayField: 'title' }
      ```
    */
   displayField?: string;
   /**
    * A string representing the attribute of the node that contains the unique ID.
      This will be used to construct the `path`, which is an array of IDs that point to the node.

      * **Default value: `id`.**

      For example, if your nodes have a `uuid` attribute, that contains the unique key, use:
      ```
        options = { idField: 'uuid' }
      ```
    */
   idField?: string;
   /**
    * A string representing the attribute of the node that contains whether the node starts as expanded.

      * **Default value: `isExpanded`.**

      For example, if your nodes have an `expanded` attribute, that contains a boolean value, use:
      ```
        options = { isExpandedField: 'expanded' }
      ```
    */
   isExpandedField?: string;
   /**
    * Function for loading a node's children.
      The function receives a TreeNode, and returns a value or a promise that resolves to the node's children.

      This function will be called whenever a node is expanded, the `hasChildren` (`options.hasChildrenField`)
      field is true, and the `children` field is empty.
      The result will be loaded into the node's children attribute.

      Example:
      ```
      * options = {
      *   getChildren: (node:TreeNode) => {
      *     return request('/api/children/' + node.id);
      *   }
      * }
      ```
    */
   getChildren?: (node: TreeNode) => any;
   /**
    * Rewire which trigger causes which action using this attribute, or create custom actions / event bindings.
    * See the [Action Mapping Section](https://angular2-tree.readme.io/docs/action-mapping) for more details.
    */
   actionMapping?: any;
   /**
    * Specify if dragging tree nodes is allowed.
    * This could be a boolean, or a function that receives a TreeNode and returns a boolean

    * **Default value: false**

    Example:
    ```
    * options = {
    *  allowDrag: true
    * }
    ```
    */
   allowDrag?: boolean | IAllowDragFn;
   /**
    * Specify whether dropping inside the tree is allowed. Optional types:
    *  - boolean
    *  - (element:any, to:{parent:TreeNode, index:number}):boolean
         A function that receives the dragged element, and the drop location (parent node and index inside the parent),
         and returns true or false.

    * **Default Value: true**

    example:
    ```
    * options = {
    *  allowDrop: (element, {parent, index}) => parent.isLeaf
    * }
    ```
   */
   allowDrop?: boolean | IAllowDropFn;
    /**
    Boolean flag to allow adding and removing is-dragging-over and is-dragging-over-disabled classes.

    If set to false it will not add the above mentioned classes and you should handle the styling yourself with css and in
    the actionMapping -> mouse -> dragEnter, dragLeave

    * **Default Value: true**

    example:
    ```
    * options = {
    *   allowDrop: true,
    *   allowDragoverStyling: false
    * }
    ```
    */
   allowDragoverStyling?: boolean;
   /**
   * Specify padding per node (integer).
    Each node will have padding-left value of level * levelPadding, instead of using the default padding for children.

    This option is good for example for allowing whole row selection, etc.

    You can alternatively use the tree-node-level-X classes to give padding on a per-level basis.

    * **Default value: 0**
   */
   levelPadding?: number;
   /**
    * Specify a function that returns a class per node. Useful for styling the nodes individually.

      Example:
      ```
      * options = {
      *   nodeClass: (node:TreeNode) => {
      *     return 'icon-' + node.data.icon;
      *   }
      * }
      ```
    */
   nodeClass?: (node: TreeNode) => string;
   /**
    Boolean flag to use the virtual scroll option.

    To use this option, you must supply the height of the container, and the height of each node in the tree.

    You can also specify height for the dropSlot which is located between nodes.

    * **Default Value: false**

    example:
    ```
    * options = {
    *   useVirtualScroll: true,
    *   nodeHeight: (node: TreeNode) => node.myHeight,
    *   dropSlotHeight: 3
    * }
    ```
    */
   useVirtualScroll?: boolean;
   /**
    * For use with `useVirtualScroll` option.
    * Specify a height for nodes in pixels. Could be either:
    * - number
    * - (node: TreeNode) => number

    * **Default Value: 22**
    */
   nodeHeight?: number | INodeHeightFn;
   /**
    * For use with `useVirtualScroll` option.
    * Specify a height for drop slots (located between nodes) in pixels

    * **Default Value: 2**
    */
   dropSlotHeight?: number;
   /**
    * Boolean whether or not to animate expand / collapse of nodes.

    * **Default Value: false**
    */
   animateExpand?: boolean;
   /**
    * Speed of expand animation (described in pixels per 17 ms).

    * **Default Value: 30**
    */
   animateSpeed?: number;
   /**
    * Increase of expand animation speed (described in multiply per 17 ms).

    * **Default Value: 1.2**
    */
   animateAcceleration?: number;
   /**
    * Whether to scroll to the node to make it visible when it is activated.

    * **Default Value: true**
    */
   scrollOnActivate?: boolean;
   /**
    * Function to clone a node.
    * Receives a TreeNode object, and returns a node object (only the data).
    * This callback will be called when copying a node inside the tree,
    * by either calling copyNode, or by dragging and holding the ctrl key
    *
    * For example:
      ```
        options: ITreeOptions = {
          getNodeClone: (node) => ({
            ...node.data,
            id: uuid.v4(),
            name: `copy of ${node.data.name}`
          })
        };
      ```
    *
    * **Default Value: clone the node using Object.assign, and remove 'id' property**
    */
    getNodeClone?: (node: TreeNode) => any;
    /**
     * Makes the tree right-to-left.
     * This include direction, expander style, and change key binding (right key collapse and left key expands instead of vice-versa)
     */
    rtl?: boolean;
    /**
     * Specifies id of root node (virtualRoot)
     */
    rootId?: any;
    /**
     * Whether to display a checkbox next to the node or not
     */
    useCheckbox?: boolean;
    /**
     * Whether to use master checkboxes mechanism if the useCheckbox is set to true
     */
    useTriState?: boolean;
    /**
     * The HTML element that is the scroll container for the tree.
     * The default behaviour is to wrap the tree with a container that has overflow: hidden,
     * and then the scrolling container is the viewport inside the tree component
     */
    scrollContainer?: HTMLElement;
    /*
    * To expand the tree on initial diaplay
    *
    */
    initialExpanded?: boolean
 }

export interface ITreeNode {
    // properties
    /**
     * Parent node
     */
    parent: ITreeNode | null;
    /**
     * The value of the node's field that is used for displaying its content.
     * By default 'name', unless stated otherwise in the options
     */
    displayField: string;
    /**
     * The children of the node.
     * By default is determined by 'node.data.children', unless stated otherwise in the options
     */
    children: ITreeNode[];
    /**
     * Pointer to the original data.
     */
    data: any;
    /**
     * Pointer to the ElementRef of the TreeNodeComponent that's displaying this node
     */
    elementRef: any;
    /**
     * Level in the tree (starts from 1).
     */
    level: number;
    /**
     * Path in the tree: Array of IDs.
     */
    path: string[];
    /**
     * index of the node inside its parent's children
     */
    index: number;
    /**
     * A unique key of this node among its siblings.
     * By default it's the 'id' of the original node, unless stated otherwise in options.idField
     */
    id: IDType;

    // helpers
    isExpanded: boolean;
    isActive: boolean;
    isFocused: boolean;
    isCollapsed: boolean;
    isLeaf: boolean;
    hasChildren: boolean;
    isRoot: boolean;

    // traversing
    /**
     * @param skipHidden whether to skip hidden nodes
     * @returns next sibling (or null)
     */
    findNextSibling( skipHidden: any): any;
    /**
     * @param skipHidden whether to skip hidden nodes
     * @returns previous sibling (or null)
     */
    findPreviousSibling( skipHidden: any ): any;
    /**
     * @param skipHidden whether to skip hidden nodes
     * @returns first child (or null)
     */
    getFirstChild( skipHidden: any ): any;
    /**
     * @param skipHidden whether to skip hidden nodes
     * @returns last child (or null)
     */
    getLastChild( skipHidden: any ): any;
    /**
     * Finds the visually next node in the tree.
     * @param goInside whether to look for children or just siblings
     * @returns next node.
     */
    findNextNode(goInside: boolean): any;
    /**
     * Finds the visually previous node in the tree.
     * @param skipHidden whether to skip hidden nodes
     * @returns previous node.
     */
    findPreviousNode( skipHidden: any ): any | null;

    /**
     * @returns      true if this node is a descendant of the parameter node
     */
    isDescendantOf(node: ITreeNode): boolean;

    /**
     * @returns      in case levelPadding option is supplied, returns the current node's padding
     */
    getNodePadding(): string;

    /**
     * @returns      in case nodeClass option is supplied, returns the current node's class
     */
    getClass(): string;

    // actions
    /**
     * Expands / Collapses the node
     */
    toggleExpanded(): void;
    /**
     * Expands the node
     */
    expand(): void;
    /**
     * Collapses the node
     */
    collapse(): void;
    /**
     * Expands all ancestors of the node
     */
    ensureVisible():void;
    /**
     * Activates / Deactivates the node (selects / deselects)
     */
    toggleActivated( multi: any ): void;
    /**
     * Focus on the node
     */
    focus(): void;
    /**
     * Blur (unfocus) the node
     */
    blur(): void;
    /**
     * Hides the node
     */
    hide(): void;
    /**
     * Makes the node visible
     */
    show(): void;
    /**
     * @param value  if true makes the node hidden, otherwise visible
     */
    setIsHidden(value: boolean): void;
    /**
     * Scroll the screen to make the node visible
     */
    scrollIntoView(): void;
    /**
     * Fire an event to the renderer of the tree (if it was registered)
     */
    fireEvent(event: any): void;
    /**
     * Invokes a method for every node under this one - depth first
     * @param fn  a function that receives the node
     */
    doForAll(fn: (node: ITreeNode) => any): void;
    /**
     * expand all nodes under this one
     */
    expandAll(): void;
    /**
     * collapse all nodes under this one
     */
    collapseAll(): void;
    /**
     * sets the node to active / inactive according to the value.
     * If multi is true (default false) - does a multiselect.
     */
    setIsActive(value: boolean, multi?: boolean): void;
    /**
     * sets the node to be active and makes sure it's visible by expanding all nodes above it and scrolling it into view.
     * Very similar to calling `activate`, `ensureVisible` and `scrollIntoView` methods.
     * If multi is true (default false) - does a multiselect.
     */
    setActiveAndVisible(multi: boolean): void;
}

export interface ITreeModel {
    // properties
    /**
     * All root nodes
     */
    roots: ITreeNode[];
    /**
     * Current focused node
     */
    focusedNode: ITreeNode | null;
    /**
     * Options that were passed to the tree component
     */
    options: ITreeOptions;

    /**
     * Is the tree currently focused
     */
    isFocused: boolean;
    /**
     * @returns Current active nodes
     */
    activeNodes: (TreeNode|null )[]
    /**
     * @returns Current expanded nodes
     */
    expandedNodes: (ITreeNode|null)[];

    // helpers
    /**
     * @returns Current active node. If multiple nodes are active - returns the first one.
     */
    getActiveNode(): ITreeNode | null;
    /**
     * @returns Current focused node (either hovered or traversed with keys)
     */
    getFocusedNode(): ITreeNode | null;
    /**
     * Set focus on a node
     * @param value  true or false - whether to set focus or blur.
     */
    setFocusedNode( node: ITreeNode | null ): void;
    /**
     * @param skipHidden  true or false - whether to skip hidden nodes
     * @returns      first root of the tree
     */
    getFirstRoot( skipHidden?: boolean ): ITreeNode | null;
    /**
     * @param skipHidden  true or false - whether to skip hidden nodes
     * @returns      last root of the tree
     */
    getLastRoot( skipHidden?: boolean ): ITreeNode | null;
    /**
     * @returns      true if the tree is empty
     */
    isEmptyTree(): boolean;
    /**
     * @returns All root nodes that pass the current filter
     */
    getVisibleRoots(): ITreeNode[];
    /**
     * @param     path  array of node IDs to be traversed respectively
     * @param     startNode  optional. Which node to start traversing from
     * @returns   The node, if found - null otherwise
     */
    getNodeByPath(path: any[], startNode?: ITreeNode | undefined | null ): ITreeNode | null;
    /**
     * @param     id  node ID to find
     * @returns   The node, if found - null otherwise
     */
    getNodeById(id: IDType): ITreeNode | any;
    /**
     * @param     predicate - either an object or a function, used as a test condition on all nodes.
     *            Could be every predicate that's supported by javaScripts Array.prototype.find() method
     * @param     startNode  optional. Which node to start traversing from
     * @returns   First node that matches the predicate, if found - null otherwise
     */
    getNodeBy( predicate: any, startNode?: ITreeNode | undefined | null ): ITreeNode | null;
    /**
     * get tree state
     */
    getState(): ITreeState;

    // actions
    /**
     * Focuses or blurs the tree
     * @param value  true or false - whether to set focus or blur.
     */
    setFocus(value: boolean): void;
    /**
     * Focuses on the next node in the tree (same as down arrow)
     */
    focusNextNode(): void;
    /**
     * Focuses on the previous node in the tree (same as up arrow)
     */
    focusPreviousNode(): void;
    /**
     * Focuses on the inner child of the current focused node (same as right arrow on an expanded node)
     */
    focusDrillDown(): void;
    /**
     * Focuses on the parent of the current focused node (same as left arrow on a collapsed node)
     */
    focusDrillUp(): void;
    /**
     * Marks isHidden field in all nodes recursively according to the filter param.
     * If a node is marked visible, all of its ancestors will be marked visible as well.
     * @param filter  either a string or a function.
     *   In case it's a string, it will be searched case insensitively in the node's display attribute
     *   In case it's a function, it will be passed the node, and should return true if the node should be visible, false otherwise
     * @param autoShow  if true, make sure all nodes that passed the filter are visible
     */
    filterNodes(filter: any, autoShow?: boolean): void;
    /**
     * Marks all nodes isHidden = false
     */
    clearFilter(): void;
    /**
     * moves a node from one location in the tree to another
     * @param node describes which node needs to be moved
     * @param to describes where to move the node to.
     * @param from describes where to move the node from.
     * Contains a 'parent' node, an 'index', and a 'dropOnNode' - to distinguish between dropping between nodes or on the node
     */
    moveNode(node: ITreeNode, to: ITreeNode ): void // {parent: ITreeNode, index: number, dropOnNode: boolean}, from: {parent: ITreeNode, index: number}): void;
    /**
     * Invokes a method for every node of the tree - depth first
     * @param fn  a function that receives the node
     */
    doForAll(fn: (node: ITreeNode) => any): void;
    /**
     * expand all nodes
     */
    expandAll(): void;
    /**
     * collapse all nodes
     */
    collapseAll(): void;
    /**
     * set tree state
     */
    setState( state: ITreeState ): void;

    subscribeToState( fn: ( state: ITreeState ) => any ): void;
}
/**
 * This is the interface of the TreeNodeDrag service
 */
export interface ITreeNodeDrag {
    /**
     * Gets the current dragged node. Useful for overriding the drop action.
     * @param node  The parent node of the current dragged node
     * @param index  The index inside parent's children, of the current dragged node
     */
    getDragNode(): { node: TreeNode, index: number };
}
