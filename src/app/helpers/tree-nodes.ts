
export interface MyTreeNode
{
    name:           string;                     // caption of the node.
    id:             number;                     // unique ID of the node.
    children?:      Array<MyTreeNode>           // Children in this node.
    faIcon?:        string;                     // faIcon to show.
    faSet?:         string;
    svgIcon?:       string;
    klass?:         string;                     // Type of node.
    disabled?:      boolean;                    // Is the node disabled (grayed).
    opened?:        boolean;                    // Is the node initial opened.
    parent?:        MyTreeNode | null;          // Internal use.
    contextmenu?:   string | Function | null;   // Internal use.
    component?:     string | Function | null;   // Internal use.
}

let newId: number = 0;


export function createNodes( cnt: number, sub_cnt: number = -1, parent: MyTreeNode | null = null ): Array<MyTreeNode>
{
    let nodes: Array<MyTreeNode> = new Array<any>();
    for ( let i = 0; i < cnt; i++ )
    {
        newId++;
        let obj: MyTreeNode = { name: `Node-#${ newId }`, id: newId, children: [], opened: true, klass: 'test-tree' }
        obj.parent = parent;
        if ( i == 2 )
        {
            obj.disabled = true;
        }
        obj.faSet = 'far'
        if ( sub_cnt > 0 )
        {
            obj.children = createNodes( sub_cnt, -1, obj );
            obj.faIcon = 'fa-folder'
        }
        else
        {
            if ( i == 0 )
            {
                //obj.faIcon = 'fa-wrench'
                //obj.faSet = 'fa'
                obj.svgIcon = 'thumbs-up';
            }
            else if ( i == 1 )
            {
                obj.faIcon = 'fa-exclamation'
                obj.faSet = 'fa'
            }
            else if ( i == 2 )
            {
                obj.faIcon = 'fa-cubes'
                obj.faSet = 'fa'
            }
            else if ( i == 3 )
            {
                obj.faIcon = 'fa-cube'
                obj.faSet = 'fa'
            }
            else if ( i == 4 )
            {
                obj.faIcon = 'fa-code'
                obj.faSet = 'fa'
            }
            else if ( i == 5 )
            {
                obj.faSet = 'fab'
                obj.faIcon = 'fa-ubuntu'
            }
            else if ( i == 6 )
            {
                obj.faSet = 'fab'
                obj.faIcon = 'fa-dev'
            }
            else if ( i == 7 )
            {
                obj.faIcon = 'fa-check-circle' 
                obj.faSet = 'fa'
            }
            else if ( i == 8 )
            {
                obj.faIcon = 'fa-bug'
                obj.faSet = 'fa'
            }
            else if ( i == 9 )
            {
                obj.faIcon = 'fa-exclamation-triangle'
                obj.faSet = 'fa'
            }                          
            else if ( i == 10 )
            {
                obj.faIcon = 'fa-spider'
                obj.faSet = 'fa'
            }                          
            else if ( i == 11 )
            {
                obj.faIcon = 'fa-laptop'
                obj.faSet = 'fa'
            }
            else
            {
                obj.faIcon = 'fa-times-circle'
            }
        }
        nodes.push( obj );
    }
    return ( nodes );
}
