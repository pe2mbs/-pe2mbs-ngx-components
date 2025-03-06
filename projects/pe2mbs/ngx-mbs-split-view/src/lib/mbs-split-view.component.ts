import { AfterContentInit, Component, ContentChildren, Input, OnChanges,
         OnDestroy, QueryList, SimpleChanges, ViewContainerRef, HostBinding, Output,
         EventEmitter, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, mergeAll, startWith, switchMap } from 'rxjs/operators';
import Split from 'split.js';
import { MbsDragEvent, MbsGutterAlignment, MbsSplitDirection } from './model';
import { MbsSplitPaneDirective } from './mbs-split-view-pane.directive';
import { MbsSplitViewGutterDirective } from './mbs-split-view-gutter.directive';



@Component({
    // tslint:disable-next-line: component-selector
    selector: 'mbs-split-view',
    template: '<ng-content select="[mbsSplitPane]"></ng-content>',
    styleUrls: [ './mbs-split-view.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbsSplitViewComponent implements OnChanges, OnDestroy, AfterContentInit 
{
    @Output() dragging    = new EventEmitter<MbsDragEvent>();
    @Output() dragStart   = new EventEmitter<MbsDragEvent>();
    @Output() dragEnd     = new EventEmitter<MbsDragEvent>();

    @Input() expandToMin  = false;
    @Input() gutterSize   = 10;
    @Input() gutterAlign: MbsGutterAlignment = 'center';
    @Input() snapOffset   = 30;
    @Input() dragInterval = 1;
    @Input() direction: MbsSplitDirection = 'horizontal';

    @ContentChildren( MbsSplitPaneDirective ) splitPanes!: QueryList<MbsSplitPaneDirective>;
    @ContentChild( MbsSplitViewGutterDirective, { static: true } ) gutterDef!: MbsSplitViewGutterDirective;

    private split!: Split.Instance | undefined;
    private subscriptions = new Subscription();

    constructor( private readonly viewContainerRef: ViewContainerRef ) 
    {
        return;
    }

    @HostBinding( 'class.split-view-horizontal' ) get isHorizontal(): boolean 
    { 
        return this.direction === 'horizontal'; 
    }

    @HostBinding( 'class.split-view-vertical' ) get isVertical(): boolean 
    { 
        return this.direction === 'vertical'; 
    }

    public ngOnChanges(changes: SimpleChanges): void 
    {
        if ( changes.direction || changes.gutterSize || changes.gutterAlign ||
             changes.snapOffset || changes.dragInterval || changes.expandToMin ) 
        {
            this.refresh();
        }
    }

    public ngAfterContentInit(): void 
    {
        const splitPaneChanges  = this.splitPanes.changes.pipe( startWith( this.splitPanes ) );
        const childrenChanges   = splitPaneChanges.subscribe( () => this.refresh() );
        const sizeChanges       = splitPaneChanges.pipe(
            switchMap( () => this.splitPanes.map( p => p.sizeChanges ) ),
            mergeAll() ).subscribe( () => this.split?.setSizes( this.getSizes() ) );
        const dragEndEvents     = this.dragEnd.pipe( map( event => event.sizes ) ).subscribe( sizes => {
            const panes = this.splitPanes.toArray();
            for ( let i = 0; i < panes.length; i++ ) 
            {
                panes[ i ].splitRatio = sizes[ i ];
            }
        } );
        this.subscriptions.add( childrenChanges );
        this.subscriptions.add( sizeChanges );
        this.subscriptions.add( dragEndEvents );
        return;
    }

    public ngOnDestroy(): void 
    {
        this.subscriptions.unsubscribe();
        this.destroySplit();
        return;
    }

    private refresh(): void 
    {
        this.destroySplit();
        if ( !this.splitPanes || this.splitPanes.length === 0 ) 
        {
            return;
        }
        const panes: Array<HTMLElement> = new Array<HTMLElement>();
        const minSizes: Array<number>   = new Array<number>();
        this.splitPanes.forEach( d => {
            panes.push( d.viewContainerRef.element.nativeElement );
            minSizes.push( d.minSize );
        });

        const splitOptions: Split.Options = {
            sizes:        this.getSizes(),
            minSize:      minSizes,
            expandToMin:  this.expandToMin,
            gutterSize:   this.gutterSize,
            gutterAlign:  this.gutterAlign,
            snapOffset:   this.snapOffset,
            dragInterval: this.dragInterval,
            direction:    this.direction,
            elementStyle: ( dimension: any, size: number, gutterSize: number ) => ( {
                flexBasis: 'calc(' + size + '% - ' + gutterSize + 'px)'
            } ),
            gutterStyle: ( dimension: any, gutterSize: number ) => ( {
                flexBasis: gutterSize + 'px'
            } ),
            onDrag: ( sizes: number[] ) => {
                if ( this.dragging.observers.length > 0 ) 
                {
                    this.dragging.emit( { source: this, sizes } );
                }
            },
            onDragStart: ( sizes: number[] ) => this.dragStart.emit( { source: this, sizes } ),
            onDragEnd: ( sizes: number[] ) => this.dragEnd.emit( { source: this, sizes } )
        };

        if ( this.gutterDef ) 
        {
            splitOptions.gutter = ( index: number, direction: MbsSplitDirection ) => {
                const view = this.viewContainerRef.createEmbeddedView(this.gutterDef.template);
                const elements = view.rootNodes.filter( ( e: any ) => e instanceof HTMLElement );
                if ( elements.length !== 1 ) 
                {
                    throw new Error('Gutter template must contain exactly one element');
                }
                return elements[ 0 ];
            };
        }
        this.split = Split( panes, splitOptions );
        return;
    }

    private destroySplit(): void 
    {
        if ( !this.split ) 
        {
            return;
        }
        this.viewContainerRef.clear();
        this.split.destroy(false, !!this.gutterDef);
        this.split = undefined;
        return;
    }

    private getSizes(): number[] 
    {
        const panes: Array<HTMLElement> = new Array<HTMLElement>();
        const ratios: Array<number>     = new Array<number>();
        let totalSize: number = 0;
        this.splitPanes.forEach( ( d: MbsSplitPaneDirective ) => {
            panes.push( d.viewContainerRef.element.nativeElement );
            const sanitizedSize: number = d.splitRatio >= 0 ? d.splitRatio : 0;
            ratios.push( sanitizedSize );
            totalSize += sanitizedSize;
        } );
        return ratios.map( ( size: number ) => ( size / totalSize ) * 100 );
    }
}
