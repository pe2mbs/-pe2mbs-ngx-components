import { Component, OnInit } from '@angular/core';
import { MbsHelpService } from './ngx-mbs-help.service';

@Component({
    selector: 'mbs-help',
    template: `<div class="help-header">
      
    </div>
<div class="help-content">

</div>
<div class="help-footer"></div>`,
    styles: [
    ]
})
export class MbsHelpDialog implements OnInit 
{
    constructor( private helpService: MbsHelpService,  ) 
    {
        return;
    }

    public ngOnInit(): void 
    {
        return;
    }

}
