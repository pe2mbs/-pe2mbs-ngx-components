import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeOptions, TreeComponent } from 'projects/pe2mbs/ngx-mbs-tree-component/src/public-api';
import { createNodes } from '../helpers/tree-nodes';


@Component({
    selector: 'app-test-split-tree-view',
    templateUrl: './test-split-tree-view.component.html',
    styleUrls: ['./test-split-tree-view.component.scss']
})
export class TestSplitTreeViewComponent implements OnInit 
{
    @ViewChild( 'dataTreeLeft',  { static: true } )  dataTreeLEft!: TreeComponent;
    @ViewChild( 'dataTreeRight',  { static: true } )  dataTreeRight!: TreeComponent;

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
            element.children = createNodes( 10, 13, element ); 
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
    
    public expandLeft( $event: any ): void
    {
        return;
    }

    public colapseLeft( $event: any ): void
    {
        return;
    }

    public expandRight( $event: any ): void
    {
        return;
    }

    public colapseRight( $event: any ): void
    {
        return;
    }

}
