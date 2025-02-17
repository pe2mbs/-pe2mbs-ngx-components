import { Component, OnInit } from '@angular/core';
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

    constructor() 
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
        console.log( 'click' );
    }
}
