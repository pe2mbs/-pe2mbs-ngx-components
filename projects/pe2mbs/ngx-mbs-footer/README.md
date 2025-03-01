# MbsFooter
Provide a application footer component that supports left, center and right segments for text and buttons.   

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
            MbsFooterModule
            ...
        ],
    } ) 
    export class AppModule 
    { 

    }

## *.html

    <mbs-footer>
        <mbs-footer-left>
            ...
        </mbs-footer-left>
        <mbs-footer-center>
            ...
        </mbs-footer-center>
        <mbs-footer-right>
            ...
        </mbs-footer-right>
        
    </mbs-footer>

or;

    <mbs-footer>
        <div mbsFooterLeft>
            ...
        </div>
        <div mbsFooterCenter>
            ...
        </div>
        <div mbsFooterRight>
            ...
        </div>
    </mbs-footer>


# API




## Build

Run `ng build ngx-mbs-footer` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-mbs-footer`, go to the dist folder `cd dist/ngx-mbs-footer` and run `npm pack` create a local package or `npm publish` to create and upload the package to npmjs.org.

