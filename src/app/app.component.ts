import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MbsHelpDialog } from 'projects/pe2mbs/ngx-mbs-help/src/public-api';
import { environment } from 'src/environments/environment';


interface IApplicationRelease
{
    name:   string;
    date:   string;
    build:  number;
};


interface IApplicationVersionDetail
{
    version: string;
    build: number;
}


export interface IApplicationVersion
{
    release: IApplicationRelease;
    frontend: IApplicationVersionDetail;
    backend: IApplicationVersionDetail;
};



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit
{
    title: string = 'Test application'
    public version!: IApplicationVersion;
    public production: boolean = false;

    constructor( private dialog: MatDialog ) 
    {        
        return;
    }

    public ngOnInit(): void 
    {
        this.version    = environment.version;
        this.production = environment.production;
        return; 
    }

    public onClick(): void
    {
        this.dialog.open( MbsHelpDialog, { height: '100%', width: '100%',data: 'helpme' } );
        
        console.log( 'click' );
    }
}
