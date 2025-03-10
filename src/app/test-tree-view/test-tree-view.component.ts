import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeOptions, TreeComponent } from 'projects/pe2mbs/ngx-mbs-tree-component/src/public-api';
import { createNodes } from '../helpers/tree-nodes';




@Component({
    selector: 'app-test-tree-view',
    templateUrl: './test-tree-view.component.html',
    styleUrls: ['./test-tree-view.component.scss']
})
export class TestTreeViewComponent implements OnInit 
{
    @ViewChild( 'dataTree',  { static: true } )  dataTree!: TreeComponent;

    public nodes = createNodes( 10 );
    public options: ITreeOptions = {
        allowDrag:          false,
        allowDrop:          false,
        useVirtualScroll:   true,
        animateExpand:      false,
        useCheckbox:        false,
        useTriState:        false,
        initialExpanded:    false,
    };

    constructor() 
    { 
        let i = 0;
        this.nodes.forEach( element => {
            element.children = createNodes( 5, 13, element ); 
            element.faIcon = 'fa-folder'
            element.faSet = 'far'
            i++;
        } );
        console.log( 'Nodes', this.nodes );
        return;
    }

    public ngOnInit(): void 
    {
        return;
    }

    public expand( $event: any )
    {
        this.dataTree.treeModel.expandAll();
    }

    public colapse( $event: any )
    {
        this.dataTree.treeModel.collapseAll();
    }

}
