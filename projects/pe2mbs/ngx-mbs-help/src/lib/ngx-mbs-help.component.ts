import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MbsHelpService } from './ngx-mbs-help.service';


@Component({
    selector: 'mbs-help',
    template: `<div class="help-header">
</div>
<div class="help-content">
    <div #content></div>
</div>
<div class="help-footer"></div>`,
    styles: [ `
.help-content 
{
    width: 100%;
    height: 100%;
}
` ]
})
export class MbsHelpDialog implements OnInit 
{
    @ViewChild( 'content', { static: true } )   el!: ElementRef;
    constructor( public dialogRef: MatDialogRef<MbsHelpDialog>,
                 private helpService: MbsHelpService,
                 @Inject(MAT_DIALOG_DATA) public topic: string ) 
    {
        return;
    }

    public ngOnInit(): void 
    {
        this.helpService.getHelp( this.topic ).subscribe( data => {
            console.log( data );
            this.el.nativeElement.innerHTML = data;
        } );
        return;
    }

    public onLoad( $event: any )
    {
        return;
    }

    public onError( $event: any )
    {
        return;
    }

    public onClose( $event: any )
    {
        this.dialogRef.close();
    }
}
