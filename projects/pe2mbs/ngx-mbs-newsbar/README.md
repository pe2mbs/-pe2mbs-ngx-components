# NgxNewsbar

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Usage
To use the NewsBarComponent youneed to add the MbsNewsbarModule to the @NgModule of AppModule class.

    @NgModule({
        ...
        imports: [
            ...
            MbsNewsbarModule,
        ],
        ...
    })
    export class AppModule { }

In the html file where the news bar should be shown, add the following:

    <mbs-newsbar></mbs-newsbar>

Optionally extra parameters may be given,these are the following, the default 
values provide the standard behaviour of the news bar.


### direction
The direction controls which direction the news scrolls, the posible values are;
    * left
    * right
    * alternate

The default value is 'left', this scrolls from right to left. 

### speed
This is the value in seconds how long it takes to scroll the news feed.

The default value is 30.

### stopOnHover
Defines whether ticker stop on hover [true, false].

The dafault value is true.

### playState
Set ticker animation transition play state [true, false]

The dafault value is true.





# Angular production

## Code scaffolding

Run `ng generate component component-name --project ngx-newsbar` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-newsbar`.
> Note: Don't forget to add `--project ngx-newsbar` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-newsbar` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-newsbar`, go to the dist folder `cd dist/ngx-newsbar` and run `npm publish`.

## Running unit tests

Run `ng test ngx-newsbar` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
