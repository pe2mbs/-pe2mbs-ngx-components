# PE2MBS collection of standard components.
These standard components are currently all Angular version 12 bases. Therefore the major version of the components is also 12. 

Why Angular 12; I started with version 6, when I upgraded to version 8 that was some work. in 2024 I upgraded again but now to version 12, that was alot more work due changes in the Angaular framework but even more to the changes of the typescript compiler.  


## ngx-mbs-crud-table
Standard implementation of the mat-table with;
* Backend paging.
* Backend column filter(s) on configurable columns.
* Backend sorting on configurable columns.
* Selectable visible columns.
* Refresh and auto-refresh buttons.
* Scrolling automatic both horizontal and vertical.

Status: Stable

## ngx-mbs-footer
Based on the mat-toolbar. 
* caption (centered).
* buttons (right side).

Status: Stable

## ngx-mbs-header
Based on the mat-toolbar. 
* logo (left side).
* title (centered).
* buttons (right side).

Status: WIP

## ngx-mbs-help
Service oriented help dialog, help information provided from backend in markdown. Simple configuration and activation via directive.

Status: Stable


## ngx-mbs-monaco-editor
Based on the ngx-monaco-editor-v2 backported from angulur version 19 using monaco-editor version 0.50.

Status: WIP


## ngx-mbs-newsbar
Application news bar for providing application users with information about the application. News messages provided from backend for normal and alert messages. Simple configuration and usage.

Status: Stable


## ngx-mbs-one-page
To keep the application within the browser window, track size of header and footer to update the content div. Tracks also the resizing of the whole screen and F11 full screen option.  

Status: Stable


## ngx-mbs-split-view
To create a movable split view both horizontal and vertical posible. 

Status: WIP

## ngx-mbs-theme-select
Selecting a theme for the application with backend theme configuration.

Status: Stable

## ngx-mbs-tree-component
Virtual tree view component to handle large data trees. 

Status: WIP


## ngx-mbs-vtoolbar
Vertical toolbar simular to the mat-toolbar, handles both mat-icon-button as mbs-icon-button.

Status: Stable

# Obsolete components

## ngx-mbs-gencrud
Some ideas which where implemeneted in ngx-mbs-crud-table, this is nor futher development shall be done. 

Status: Obsolete

# TODO
Still some work is needed on some components.


# Futhure versions



# TestPackage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
