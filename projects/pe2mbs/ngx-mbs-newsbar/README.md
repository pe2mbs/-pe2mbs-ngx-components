# NgxNewsbar
The newsbar component shows a rss news feed in the application. When no messages are present the
newsbar is hidden, when messages are present the newsbar is shows automaticlly.  

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


# API


## Usage
To use the NewsBarComponent youneed to add the MbsNewsbarModule to the @NgModule of AppModule class.
and add in 'providers' the variable 'MbsNewsFeedUri' and the usr value where your news uri in your 
backend.

    @NgModule({
        ...
        imports: [
            ...
            MbsNewsbarModule,
        ],
        providers: [
            ...
            { provide: 'MbsNewsFeedUri', useValue: '/api/rss/newsfeed' }, 
            ...
        ],
        ...
    })
    export class AppModule { }

In the html file where the news bar should be shown, add the following:

    <mbs-newsbar></mbs-newsbar>

Optionally extra parameters may be given,these are the following, the default 
values provide the standard behaviour of the news bar.

## Backend interface

The backend must provide the following interface. 

    export interface INewMessage 
    {
        message:    string;
        alert:      boolean
    }


    export interface INewMessages 
    {
        enabled:    boolean;
        messages?:  Array<INewMessage>;
    }


### Python pydantic, version 2.x 

    import typing
    from pydandic import BaseModel


    class INewMessage( BaseModel ):
        message:    str
        alert:      bool


    class INewMessages( BaseModel ):
        enabled:    bool
        messages:   typing.List[ INewMessage ] = None


    @app.route( '/api/rss/newsfeed', methods = [ 'GET' ] )
    def news_feed():
        newsData = INewMessages( enabled = false )
        ...

        return newsData  


## Attributes of 'mbs-newsbar'

### direction
The direction controls which direction the news scrolls, the posible values are;
    * left
    * right
    * alternate

The default value is 'left', this scrolls from right to left. 

### speed
This is the value in seconds how long it takes to scroll the news feed.

The default value is 30.

### updateInterval
Sets the interval for the news service class. 

The default interval 300 seconds. 

### stopOnHover
Defines whether ticker stop on hover [true, false].

The dafault value is true.

### playState
Set ticker animation transition play state [true, false]

The dafault value is true.


# Angular production

## Build

Run `ng build ngx-newsbar` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-newsbar`, go to the dist folder `cd dist/ngx-newsbar` and run `npm publish`.

## Running unit tests

Run `ng test ngx-newsbar` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
