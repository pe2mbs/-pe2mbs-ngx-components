import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MbsHelpService } from './mbs-help.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IMbeHelpRequest } from './mbs-help.model';


@Component({
    selector: 'mbs-help',
    template: `<div class="help-dialog">
    <div class="help-header">{{ data.title }}</div>
    <div class="markdown-body" [innerHTML]="helpData"></div>
    <div class="help-footer"><div class="center">
        <button mat-raised-button color="accent" (click)="onClose( $event )"> Close</button>
    </div></div>
</div>`,
    styleUrls: [ './mbs-help.component.css',
                 './github-markdown.css' ],
    encapsulation: ViewEncapsulation.None,
})
export class MbsHelpDialog implements OnInit 
{
    public helpData: SafeHtml = '';
    
    constructor( public dialogRef: MatDialogRef<MbsHelpDialog>,
                 private helpService: MbsHelpService,
                 private sanitized: DomSanitizer,
                 @Inject( MAT_DIALOG_DATA ) public data: IMbeHelpRequest ) 
    {
        return;
    }

    public ngOnInit(): void 
    {
        this.helpService.getHelp( this.data.topic ).subscribe( data => {
            console.log( data );
            this.helpData = this.sanitized.bypassSecurityTrustHtml( data );
        } );
        return;
    }

    public onClose( $event: any )
    {
        this.dialogRef.close();
    }
}
