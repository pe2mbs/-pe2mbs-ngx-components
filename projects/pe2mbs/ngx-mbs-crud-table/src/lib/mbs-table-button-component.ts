import { Component, EventEmitter, Input, Output } from "@angular/core";


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
