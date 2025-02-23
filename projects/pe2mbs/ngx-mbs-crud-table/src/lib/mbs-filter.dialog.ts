import { Component, ElementRef, Inject, OnInit } from "@angular/core";
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EMbsFilterModes, IMbsColumn, IMbsFilterMode, IMbsFilterRequest, IMbsFilterSettings } from "./mbs-crud.models";


interface IWindowSize
{
    height: number;
    width:  number;
}


@Component( {
    selector: 'mbs-filter-dialog',
    templateUrl: 'mbs-filter.dialog.html',
} )
export class MbsCrudFilterDialog implements OnInit 
{
    private dialogWidth: number = 400;
    private elementRef: ElementRef;
    public selectMode: number = EMbsFilterModes.Contains;
    public filterModes: Array<IMbsFilterMode> = [
        { value: EMbsFilterModes.Contains, label: 'Contains' },
        { value: EMbsFilterModes.Equal, label: 'Equal' },
        { value: EMbsFilterModes.NoEqual, label: 'Not equal' },
        { value: EMbsFilterModes.Startswith, label: 'Starts with' },
        { value: EMbsFilterModes.Endswith, label: 'Ends with' },
        { value: EMbsFilterModes.Empty, label: 'Empty' },
        { value: EMbsFilterModes.NotEmpty, label: 'Not empty' },
    ]; 
    public filterValue: string | number | Date = ''
    public column: IMbsColumn; 

    constructor( private readonly mat_dialog_ref: MatDialogRef<MbsCrudFilterDialog>,
                 @Inject(MAT_DIALOG_DATA) data: IMbsFilterRequest ) 
    {
        this.elementRef = data.element;
        this.column     = data.column;
        return;
    }

    public apply(): void
    {
        this.mat_dialog_ref.close( { column: this.column.field, value: this.filterValue, mode: this.selectMode } as IMbsFilterSettings );
    }
        
    public cancel(): void 
    {
        // This clears the filter, when it was active
        this.filterValue = '';
        this.mat_dialog_ref.close( { column: this.column.field, value: this.filterValue, mode: EMbsFilterModes.Cleared } as IMbsFilterSettings );
    }

    public ngOnInit() 
    {
        const matDialogConfig: MatDialogConfig = new MatDialogConfig();
        console.log( 'this.matFilter', this.elementRef );
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        let left = rect.left;
        if ( ( rect.left + this.dialogWidth ) >= this.getWindowSize().width )
        {
            left = rect.left - ( this.dialogWidth - this.elementRef.nativeElement.clientWidth );
        }
        matDialogConfig.position = { left: `${left}px`, top: `${rect.bottom}px` };
        matDialogConfig.width = `${ this.dialogWidth }px`;
        matDialogConfig.height = '300px';
        this.mat_dialog_ref.updateSize( matDialogConfig.width, matDialogConfig.height );
        this.mat_dialog_ref.updatePosition( matDialogConfig.position );
        if ( this.column.currentFilter )
        {
            this.filterValue = this.column.currentFilter.value;
            this.selectMode = ( this.filterValue == EMbsFilterModes.Cleared ? EMbsFilterModes.Contains: this.column.currentFilter.mode );
        }
        else
        {
            this.selectMode = EMbsFilterModes.Contains;
            this.filterValue = '';
        }
        return;
    }

    protected getWindowSize(): IWindowSize
    {
        const docEl                 = document.documentElement; 
        const IS_BODY_ACTING_ROOT   = docEl && docEl.clientHeight === 0;
        // Used to feature test Opera returning wrong values for documentElement.clientHeight. 
        function isDocumentElementHeightOff() 
        { 
            var d = document, div = d.createElement('div');
            div.style.height = "2500px";
            d.body.insertBefore( div, d.body.firstChild );
            var r = d.documentElement.clientHeight > 2400;
            d.body.removeChild( div );
            return ( r );
        }
        console.log( 'document', document );
        // @ts-ignore
        if ( typeof document.clientWidth == "number" ) 
        {
            // @ts-ignore
            return { width: document.clientWidth, height: document.clientHeight };
        } 
        else if ( IS_BODY_ACTING_ROOT || isDocumentElementHeightOff() ) 
        {
            var b = document.body;
            return { width: b.clientWidth, height: b.clientHeight };
        } 
        return { width: docEl.clientWidth, height: docEl.clientHeight };
    }
}