import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MbsHelpDialog } from './mbs-help.component';
import { IMbeHelpRequest } from './mbs-help.model';


@Directive({
    selector: '[mbsHelpTrigger]'
})
export class MbsHelpDirective 
{
    @Input() mbsHelpTrigger!: string
    @Input() helpTitle: string = 'Help information';
    constructor( private dialog: MatDialog ) 
    { 
        return
    }

    @HostListener( 'click', ['$event'] ) onClick( $event: any )
    {
        console.info( 'clicked: ' + this.mbsHelpTrigger, $event );
        this.dialog.open( MbsHelpDialog, { 
            height: '95%', width: '100%',
            data: {
                topic: this.mbsHelpTrigger,
                title: this.helpTitle
            } as IMbeHelpRequest,
            panelClass: "mbs-help-dialog",
      } );
      return;
    }
}
