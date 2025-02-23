import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MbsHelpService 
{
    constructor( http: HttpClient, @Inject( 'MbsHelpUri' ) @Optional() private uri?: string  ) 
    { 
        return;
    }


    
}
