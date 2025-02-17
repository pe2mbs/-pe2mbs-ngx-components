import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewContainerRef,
  HostBinding,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, mergeAll, startWith, switchMap } from 'rxjs/operators';
import Split from 'split.js';

export type SplitDirection = 'horizontal' | 'vertical';

export type GutterAlignment = 'start' | 'end' | 'center';

export interface DragEvent {
  readonly source: SplitViewComponent;
  readonly sizes: ReadonlyArray<number>;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[splitPane]'
})
export class SplitPaneDirective implements OnChanges {
  @Input() splitRatio = 1;
  @Input() minSize = 100;

  sizeChanges = new Subject<void>();
  minSizeChanges = new Subject<void>();

  constructor(public readonly viewContainerRef: ViewContainerRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.splitRatio) {
      this.sizeChanges.next();
    }

    if (changes.minSize) {
      this.minSizeChanges.next();
    }
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[gutterTemplate]'
})
export class SplitViewGutterDirective {
  constructor(public readonly template: TemplateRef<any>) {
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'split-view',
  template: '<ng-content select="[splitPane]"></ng-content>',
  styleUrls: ['./split-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitViewComponent implements OnChanges, OnDestroy, AfterContentInit {

  @Output() dragging = new EventEmitter<DragEvent>();
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();

  @Input() expandToMin = false;
  @Input() gutterSize = 10;
  @Input() gutterAlign: GutterAlignment = 'center';
  @Input() snapOffset = 30;
  @Input() dragInterval = 1;
  @Input() direction: SplitDirection = 'horizontal';

  @ContentChildren(SplitPaneDirective) splitPanes!: QueryList<SplitPaneDirective>;
  @ContentChild(SplitViewGutterDirective, { static: true }) gutterDef!: SplitViewGutterDirective;

  private split!: Split.Instance | undefined;
  private subscriptions = new Subscription();

  constructor(private readonly viewContainerRef: ViewContainerRef) {
  }

  @HostBinding('class.split-view-horizontal')
  get isHorizontal(): boolean { return this.direction === 'horizontal'; }

  @HostBinding('class.split-view-vertical')
  get isVertical(): boolean { return this.direction === 'vertical'; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.direction ||
      changes.gutterSize ||
      changes.gutterAlign ||
      changes.snapOffset ||
      changes.dragInterval ||
      changes.expandToMin) {

      this.refresh();
    }
  }

  ngAfterContentInit(): void {
    const splitPaneChanges = this.splitPanes.changes
      .pipe(startWith(this.splitPanes));

    const childrenChanges = splitPaneChanges
      .subscribe(() => this.refresh());

    const sizeChanges = splitPaneChanges
      .pipe(
        switchMap(() => this.splitPanes.map(p => p.sizeChanges)),
        mergeAll())
      .subscribe(() => this.split?.setSizes(this.getSizes()));

    const dragEndEvents = this.dragEnd
      .pipe(map(event => event.sizes))
      .subscribe(sizes => {
        const panes = this.splitPanes.toArray();
        for (let i = 0; i < panes.length; i++) {
          panes[i].splitRatio = sizes[i];
        }
      });

    this.subscriptions.add(childrenChanges);
    this.subscriptions.add(sizeChanges);
    this.subscriptions.add(dragEndEvents);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destroySplit();
  }

  private refresh(): void {
    this.destroySplit();

    if (!this.splitPanes || this.splitPanes.length === 0) {
      return;
    }

    const panes = new Array<HTMLElement>();
    const minSizes = new Array<number>();

    this.splitPanes.forEach(d => {
      panes.push(d.viewContainerRef.element.nativeElement);
      minSizes.push(d.minSize);
    });

    const splitOptions: Split.Options = {
      sizes: this.getSizes(),
      minSize: minSizes,
      expandToMin: this.expandToMin,
      gutterSize: this.gutterSize,
      gutterAlign: this.gutterAlign,
      snapOffset: this.snapOffset,
      dragInterval: this.dragInterval,
      direction: this.direction,
      elementStyle: (dimension, size, gutterSize) => ({
        flexBasis: 'calc(' + size + '% - ' + gutterSize + 'px)'
      }),
      gutterStyle: (dimension, gutterSize) => ({
        flexBasis: gutterSize + 'px'
      }),
      onDrag: (sizes) => {
        if (this.dragging.observers.length > 0) {
          this.dragging.emit({ source: this, sizes });
        }
      },
      onDragStart: (sizes) => this.dragStart.emit({ source: this, sizes }),
      onDragEnd: (sizes) => this.dragEnd.emit({ source: this, sizes })
    };

    if (this.gutterDef) {
      splitOptions.gutter = (index, direction) => {
        const view = this.viewContainerRef.createEmbeddedView(this.gutterDef.template);
        const elements = view.rootNodes.filter(e => e instanceof HTMLElement);
        if (elements.length !== 1) {
          throw new Error('Gutter template must contain exactly one element');
        }
        return elements[0];
      };
    }

    this.split = Split(panes, splitOptions);
  }

  private destroySplit(): void {
    if (!this.split) {
      return;
    }

    this.viewContainerRef.clear();
    this.split.destroy(false, !!this.gutterDef);
    this.split = undefined;
  }

  private getSizes(): number[] {
    const panes = new Array<HTMLElement>();
    const ratios = new Array<number>();
    let totalSize = 0;

    this.splitPanes.forEach(d => {
      panes.push(d.viewContainerRef.element.nativeElement);

      const sanitizedSize = d.splitRatio >= 0 ? d.splitRatio : 0;
      ratios.push(sanitizedSize);
      totalSize += sanitizedSize;
    });

    return ratios.map(size => (size / totalSize) * 100);
  }
}
