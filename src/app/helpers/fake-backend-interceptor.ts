import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { INewMessages } from 'projects/pe2mbs/ngx-mbs-newsbar/src/public-api';
import { IMbsMenuItem } from 'projects/pe2mbs/ngx-mbs-menubar/src/lib/ngx-mbs-base-item';
import { IMbsThemeItem } from 'projects/pe2mbs/ngx-mbs-theme-select/src/public-api';
import { FakeCrudBackend } from 'projects/pe2mbs/ngx-mbs-crud-table/src/lib/mbs-fake-crud';
import { FakeSample_Data } from './fake-backend_sample_data';


const FakeMenu: Array<IMbsMenuItem> = [
    {
        id: "0",
        caption: "Home",
        routerLink: "/",
        visible: true,
        icon: [ 'fas', "home" ]
    },
    {
        id: "1",
        caption: "Test CRUD",
        routerLink: "test-crud",
        visible: true,
        icon: [ 'fas', "landmark" ]
    },
    {
        id: "2",
        caption: "Editor",
        routerLink: "test-editor",
        visible: true,
        icon: [ 'fas', "tools" ]
    },
    {
        id: "3",
        caption: "Extras",
        icon: [ 'fas', "sms" ],
        visible: true,
        items: [
            {
                id: "3.1",
                caption: "Diff editor",
                routerLink: "test-diff-editor",
                visible: true,
                icon: [ 'fas', "trash-alt" ]
            },
            {
                id: "3.2",
                caption: "Link 3.2 - google.uk.co",
                visible: true,
                routerLink: "#https://www.google.uk.co",
                icon: [ 'fas', "trash" ]
            },
            {
                id: "3.3",
                caption: "Link 3.3 - google.es",
                visible: true,
                icon: [ 'fas', "sync" ],
                items: [
                    {
                        id: "3.3.1",
                        caption: "Link 3.3.1 - google.nl",
                        routerLink: "#https://www.google.nl",
                        visible: true,
                        icon: [ 'fas', "trash-alt" ]
                    },
                    {
                        id: "3.3.2",
                        caption: "Link 3.3.2 - google.com",
                        routerLink: "#https://www.google.com",
                        visible: true,
                        icon: [ 'fas', "trash" ]
                    }
                ]
            }

        ]
    },
    {
        id: "4",
        caption: "3D Scene at Sea",
        routerLink: "#https://davidmartinezros.com/Angular2/3d-scene-at-sea/",
        visible: true,
        icon: [ 'fas', "cubes" ]
    },
    {
        id: "5",
        caption: "About",
        routerLink: "#https://davidmartinezros.com/Angular2/3d-scene-at-sea/",
        visible: true,
        icon: [ 'fab', "google" ]
    }
];

const newsFeed: INewMessages = {
    enabled: false,
    messages: [
        {
            message: 'Normal RSS message',
            alert: false
        },
        {
            message: 'Alert RSS message',
            alert: true
        }
    ]
}

const themes: IMbsThemeItem[] = [
    {
        displayName: 'Orange theme',
        name: 'orange-theme',
        isDark: false,
    },
    {
        displayName: 'Dark theme',
        name: 'dark-theme',
        isDark: false,
    },
    {
        displayName: 'Light theme',
        name: 'light-theme',
        isDark: false,
        isDefault: true,
    },
    {
        displayName: 'Worldline theme',
        name: 'worldline-theme',
        isDark: false,
        isDefault: false,
    },
    {
        displayName: 'Equens theme',
        name: 'equens-theme',
        isDark: false,
        isDefault: true,
    },
    {
        displayName: 'Development theme',
        name: 'dev-theme',
        isDark: false,
        isDefault: true,
    },
];

const helpData: string = `# PE2MBS collection of standard components.

## ngx-mbs-crud-table
Standard implementation of the mat-table with;
* Backend paging.
* Backend column filter(s) on configurable columns.
* Backend sorting on configurable columns.
* Selectable visible columns.
* Refresh and auto-refresh buttons

## ngx-mbs-help
`;


@Injectable({
    providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor 
{
    private backends: Array<FakeCrudBackend<any>> = new Array<FakeCrudBackend<any>>();
    constructor()
    {
        // console.log("FakeBackendInterceptor");
        this.backends.push( new FakeSample_Data() );
        // this.backends.push( new FakeUsers() );
        return;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        /**
        * 
        */
        const { url, method, headers, body } = request;
        for ( let i = 0; i < this.backends.length; i++ )
        {
            // console.log( url, ' => ', this.backends[ i ].uri )
            if ( url.startsWith( this.backends[ i ].uri ) )
            {
                // Found fake CRUD class 
                return this.backends[ i ].handleRoute( request, next )
            }   
        }
        return handleRoute( url, method, headers, body );
    
        function handleRoute( url: string, method: string, headers: any, body: string ) 
        {
            /**
            *    This deals with login and register
            */
            switch (true) 
            {
            case url.endsWith('/api/rss/newsfeed') && method === 'GET':
                return ok( newsFeed );

            case url.endsWith('/api/menu') && method === 'GET':
                return ok( FakeMenu );

            case url.endsWith('/api/theme/default') && method === 'GET':
                return ok( 'light-theme' );

            case url.endsWith('/api/theme/list') && method === 'GET':
                return ok( themes ); 

            case url.endsWith( '/api/backend/version' ) && method === 'GET':
                const versionData: any = {
                    version: '2.23.1234'
                }
                return ok( versionData );

            case url.endsWith( '/api/help/helpme' ) && method === 'GET':
                
                return ok( helpData );

            default:
                // pass through any requests not handled above
                return next.handle(request);
            }    
        }    

        // route functions

        // function authenticate() 
        // {
        //     const { username, password } = body;
        //     const user = users.find( x => x.username === username && x.password === password );
        //     if ( !user ) 
        //     {
        //         return throwError(() => ({ error: 'Username or password is incorrect' })).pipe(materialize(), delay(500), dematerialize()); 
        //     }
        //     return ok( {
        //         ...basicDetails(user),
        //         token: 'fake-jwt-token'
        //     } );
        // }

        // function register() 
        // {
        //     const user = body
        //     if ( users.find(x => x.username === user.username ) ) 
        //     {
        //         return throwError(() => ( { error: `Username "${ user.username }" is already taken` } ) ).pipe( materialize(), delay(500), dematerialize()); 
        //     }
        //     user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        //     users.push(user);
        //     localStorage.setItem(usersKey, JSON.stringify(users));
        //     return ok();
        // }
        
        // helper functions

        function ok( body?: any ) 
        {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function basicDetails(user: any) 
        {
            const { id, username, firstName, lastName } = user;
            return { id, username, firstName, lastName };
        }
    }
}


export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
};
