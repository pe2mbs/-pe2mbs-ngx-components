# NgxOnePage
This directive controls the resizeing off the application, in a one page application its
keeps the screen fit within the browser winodw. It uses three ContentChild's to monitor 
and set the size of the content-window. Where the header and footer may resize the content-
window is resized accoringly. 

## app.module.ts

    import { MbsOnePageModule } from '@pe2mbs/ngx-mbs-one-page';

    @NgModule({
        declarations: [
            ...
        ],
        imports: [
            ...
            MbsOnePageModule
            ...
        ],
        schemas: [ 
            CUSTOM_ELEMENTS_SCHEMA 
        ]
    })
    export class AppModule { }


## HTML of main page 

    <div class="max-window" mbsOnePage>
        <div #header_content class="content-header">
            ...
        </div>
        <div #window_content class="content-window">
            ...
        </div>
        <div #footer_content class="content-footer">
            ...
        </div>
    </div>


# Angular 
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Build

Run `ng build ngx-one-page` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-one-page`, go to the dist folder `cd dist/ngx-one-page` and run `npm publish`.

