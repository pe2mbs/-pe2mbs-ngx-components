import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { NgxCrudFilterDialog } from "./ngx-filter.dialog";
import { EFilterModes, IFilterRequest, IFilterSettings } from "./ngx-crud.models";



@Directive({
    selector: '[matFilter]',
})
export class NgxCrudFilterDirective implements OnInit
{
    @Output()   confirm = new EventEmitter<any>();
    @Input()    columnInfo: any; 
    @Input()    filterColor!: string;
    
    protected   colors: string[] = [ 'black', 'red' ];

    @HostListener('click') doConfirm() 
    {
        const dialogRef = this.dialog.open( NgxCrudFilterDialog, { data: {
            element:    this.element,
            column:     this.columnInfo,
        } as IFilterRequest } );
        dialogRef.afterClosed().subscribe( ( filter: IFilterSettings ) => {
            if ( filter.mode == EFilterModes.Cleared )
            {
                this.render.setStyle( this.element.nativeElement, 'color', this.colors[ 0 ] );
            }
            else
            {
                this.render.setStyle( this.element.nativeElement, 'color', this.colors[ 1 ] );
            }
            this.confirm.emit( filter );
        } );
        return;
    }
  
    constructor( private dialog: MatDialog, private element: ElementRef, protected render: Renderer2 ) 
    {
        return;
    }

    public ngOnInit(): void 
    {
        if ( typeof this.filterColor == 'string' )
        {
            const colors = this.filterColor.split( ',' );
            if ( this.colors.length != 2 ) 
            {
                throw Error( 'filterColor must be two colors comma separated' );
            }
            this.colors = colors;
        }
        return;    
    }
}