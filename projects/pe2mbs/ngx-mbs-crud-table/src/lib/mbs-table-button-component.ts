import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Inject, Input, Optional, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MbsHelpDialog } from "projects/pe2mbs/ngx-mbs-help/src/public-api";


@Component( { 
    selector: 'mbs-table-button',
    template: `<button class="table-icon-button" [disabled]="disabled"
                (click)="onClick( $event )" [matTooltip]="tooltip" >
    <mat-icon>{{ icon }}</mat-icon>
</button>`,
    styleUrls: [ './mbs-table-button-component.scss' ]
} )
export class MbsTableButton 
{
    @Input()    disabled: boolean = false;   
    @Input()    icon!: string;
    @Input()    color!: string;
    @Input()    tooltip!: string;

    @Output()   click: EventEmitter<any> = new EventEmitter<any>();

    public onClick( $event: any ): void
    {
        $event.stopPropagation();
        this.click.emit( $event );
        return;
    }
}


@Component( { 
    selector: 'mbs-table-help',
    template: `<button class="table-icon-button"
                (click)="onClick( $event )" matTooltip="tooltip" >
    <mat-icon>help_outline</mat-icon>
</button>`,
    styleUrls: [ './mbs-table-button-component.scss' ]
} )
export class MbsTableHelpButton 
{
    @Input()    color!: string;
    @Input()    topic!: string;

    
    @Output()   click: EventEmitter<any> = new EventEmitter<any>();

    constructor( private dialog: MatDialog )
    {
        return;
    }

    public onClick( $event: any ): void
    {
        $event.stopPropagation();
        const dialogRef = this.dialog.open( MbsHelpDialog, {
            width: '95%',
            height: '95%',
            data: { name: `/api/help/table/${ this.topic }` }
        } );
      
        dialogRef.afterClosed().subscribe(result => {
            ;
        } );
        return;
    }
}