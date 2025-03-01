# NgxMbsHeader

# Docs
Our documentation pages can nbe found [repository](https://github.com/pe2mbs/-pe2mbs-ngx-components) 

# Demo
Checkout the [demo page](https://github.com/pe2mbs/-pe2mbs-ngx-components) to see mbs-help in action.

# Compatibility
Angular 12 at this monent. 

# License
Copyright (c) 2020-2025, Marc Bertens-Nguyen. (GPL2-only License)


# Installation

    npm install @pe2mbs/ngx-mbs-footer

# Usage
## app.module.ts
Some basic implemention in the `app.module.ts`

    @NgModule( {
        ...
        imports: [
            ...
            MbsHeaderModule
            ...
        ],
    } ) 
    export class AppModule 
    { 

    }

## *.html

    <mbs-header>
        <mbs-header-left>
            ...
        </mbs-header-left>
        <mbs-header-center>
            ...
        </mbs-header-center>
        <mbs-header-right>
            ...
        </mbs-header-right>
        
    </mbs-header>

or;

    <mbs-header>
        <div mbsHeaderLeft>
            ...
        </div>
        <div mbsHeaderCenter>
            ...
        </div>
        <div mbsHeaderRight>
            ...
        </div>
    </mbs-header>



# API

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Code scaffolding

Run `ng generate component component-name --project ngx-mbs-header` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-mbs-header`.
> Note: Don't forget to add `--project ngx-mbs-header` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-mbs-header` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-mbs-header`, go to the dist folder `cd dist/ngx-mbs-header` and run `npm publish`.

## Running unit tests

Run `ng test ngx-mbs-header` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
