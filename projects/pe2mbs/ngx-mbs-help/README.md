# NgxMbsHelp
This library was created from the first created help component. This original component needed to be copied and included in the application. This was not and universal approach, therefore this library was created and improved implementation.     

This library provides the following;
* directive `mbsHelpTrigger` => MbsHelpDirective
* component `mbs-help` => MbsHelpDialog
* service => MbsHelpService

# Docs
Our documentation pages can nbe found [repository](https://github.com/pe2mbs/ngx-components) 

# Demo
Checkout the [demo page](https://github.com/pe2mbs/ngx-components) to see mbs-help in action.

# Compatibility
Angular 12 at this monent and marked 4.0.10 and @types/marked 4.0.2.
Node.js: Only current and LTS Node.js versions are supported. End of life Node.js versions may become incompatible with NgxMbsHelp at any point in time.

Browser: Not IE11 :-)

# License
Copyright (c) 2020-2025, Marc Bertens-Nguyen. (GPL2-only License)


# Installation

    npm install @pe2mbs/ngx-mbs-help

# Usage
## app.module.ts
Some basic implemention in the `app.module.ts`

    @NgModule( {
        ...
        imports: [
            ...
            MatButtonModule,
            MatIconModule,
            MbsHelpModule
            ...
        ],
        providers: [
            ...
            { 
                provide: 'MbsHelp', 
                useValue: { 
                    uri: '/api/help' 
                } 
            },
            ...
        ]
    } ) 
    export class AppModule 
    { 

    }

## *.html
Add in any html file where help needs to be called.

    <button mat-icon-button mbsHelp="general">
        <mat-icon>home</mat-icon>
    </button>

# API

## directive MbsHelpDirective
This directive can be added on a button element to trigger the help dialog.

### attribute mbsHelpTrigger
Here the topic is provided.

### attribute helpTitle
Here the title may be provided, when omitted the default is 'Help Information'

### example

    <mbs-icon-button mbsHelpTrigger="general" helpTitle="General informtion">
        <mat-icon>home</mat-icon>
    </mbs-icon-button>

## component MbsHelpDialog
The component is the actual dialog. It receives 'data' as `IMbeHelpRequest`. On invocation
the backend is called via `MbsHelpService` with the topic to retrieve the information in markdown format.


## service MbsHelpService
The help service uses the `MbsHelp` parameter from the `app.module.ts`. The service retrives the information from the backend and execute the 'marked' library to provides the help output for displaying in the `MbsHelpDialog`.


## interface IMbeHelpRequest
The interface contains two fields;

    title?: string
    topic:  string

### title
the field is optional, when omitted the default is 'Help Information'

### topic
The field is mandatory and should contain the name is the information to show.

## interface IHelpInfo
The interface contains three fields;

    uri:              string;
    sanitizeHtml:     boolean;
    markedExtension?: marked.MarkedExtension;

### uri
The field contains the base `uri` for the information and is added with the `topic`. The actual uri shall be `${ uri }/${ toptic }`. 

### sanitizeHtml
The field contains `true` or `false`, the may be omitted.

### markedExtension
This field controls the behaviour of the marked library, see for more information [NPM - Marked](https://www.npmjs.com/package/marked)


# Angular 12
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Build

Run `ng build ngx-mbs-help` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-mbs-help`, go to the dist folder `cd dist/ngx-mbs-help` and run `npm publish`.

## Running unit tests

Run `ng test ngx-mbs-help` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
