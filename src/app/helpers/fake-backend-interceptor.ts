import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MbsMenuItem } from 'projects/pe2mbs/ngx-mbs-menubar/src/lib/mbs-menuitem';
import { INewMessages } from 'projects/pe2mbs/ngx-mbs-newsbar/src/public-api';
import { Theme } from '../theme-selection/mbs-theme.service';


const FakeMenu: Array<MbsMenuItem> = [
    {
        id: "0",
        caption: "Home",
        link: "/",
        icon: "fa-home"
    },
    {
        id: "1",
        caption: "Which Monument",
        link: "#https://davidmartinezros.com/Angular5/which-monument/",
        icon: "fa-landmark"
    },
    {
        id: "2",
        caption: "Interactive background geometries threejs",
        link: "#https://davidmartinezros.com/Angular5/interactive-background-geometries-threejs/",
        icon: "fa-tools"
    },
    {
        id: "3",
        caption: "Chatbot Myyme",
        icon: "fa-sms",
        children: [
            {
                id: "3.1",
                caption: "Link 3.1 - google.nl",
                link: "#https://www.google.nl",
                icon: "fa-trash-alt"
            },
            {
                id: "3.2",
                caption: "Link 3.2 - google.uk.co",
                link: "#https://www.google.uk.co",
                icon: "fa-trash"
            },
            {
                id: "3.3",
                caption: "Link 3.3 - google.es",
                icon: "fa-sync",
                children: [
                    {
                        id: "3.3.1",
                        caption: "Link 3.3.1 - google.nl",
                        link: "#https://www.google.nl",
                        icon: "fa-trash-alt"
                    },
                    {
                        id: "3.3.2",
                        caption: "Link 3.3.2 - google.com",
                        link: "#https://www.google.com",
                        icon: "fa-trash"
                    }
                ]
            }

        ]
    },
    {
        id: "4",
        caption: "3D Scene at Sea",
        link: "#https://davidmartinezros.com/Angular2/3d-scene-at-sea/",
        icon: "fa-cubes"
    },
    {
        id: "5",
        caption: "About",
        link: "#https://davidmartinezros.com/Angular2/3d-scene-at-sea/",
        icon: "fa-address-card"
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

const themes: Theme[] = [
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


@Injectable({
    providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor 
{
    // private backends: Array<FakeCrudBackend<any>> = new Array<FakeCrudBackend<any>>();
    constructor()
    {
        // console.log("FakeBackendInterceptor");
        // this.backends.push( new FakePeriodicElement() );
        // this.backends.push( new FakeUsers() );
        return;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        /**
        * 
        */
        const { url, method, headers, body } = request;
        // for ( let i = 0; i < this.backends.length; i++ )
        // {
        //     // console.log( url, ' => ', this.backends[ i ].uri )
        //     if ( url.startsWith( this.backends[ i ].uri ) )
        //     {
        //         // Found fake CRUD class 
        //         return this.backends[ i ].handleRoute( request, next )
        //     }   
        // }
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

            case url.endsWith('/api/theme') && method === 'GET':
                return ok( 'dark-theme' );

            case url.endsWith('/api/themes') && method === 'GET':
                return ok( themes ); 

            case url.endsWith( '/api/backend/version' ) && method === 'GET':
                const versionData: any = {
                    version: '2.23.1234'
                }
                return ok( versionData );

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
