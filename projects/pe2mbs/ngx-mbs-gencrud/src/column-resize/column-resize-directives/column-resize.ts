/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directive, ElementRef, NgZone } from '@angular/core';
import { ColumnResize } from '../column-resize';
import { ColumnResizeNotifier, ColumnResizeNotifierSource } from '../column-resize-notifier';
import { HeaderRowEventDispatcher } from '../event-dispatcher';

import { TABLE_HOST_BINDINGS, TABLE_PROVIDERS } from './common';

/**
 * Explicitly enables column resizing for a table-based mat-table.
 * Individual columns must be annotated specifically.
 */
@Directive({
    selector: 'table[mat-table][columnResize]',
    host: TABLE_HOST_BINDINGS,
    providers: [...TABLE_PROVIDERS, { provide: ColumnResize, useExisting: MatColumnResize }],
})
export class MatColumnResize extends ColumnResize 
{
    constructor( readonly columnResizeNotifier: ColumnResizeNotifier, readonly elementRef: ElementRef<HTMLElement>,
                 protected readonly eventDispatcher: HeaderRowEventDispatcher, protected readonly ngZone: NgZone,
                 protected readonly notifier: ColumnResizeNotifierSource ) 
    {
        super();
        return;
    }
}
