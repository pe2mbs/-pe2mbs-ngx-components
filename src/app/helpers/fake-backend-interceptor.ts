import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FakeCrudBackend } from 'projects/pe2mbs/ngx-mbs-crud-table/src/lib/mbs-fake-crud';
import { FakeSample_Data } from './fake-backend_sample_data';
import { FakeMenu } from './static_data/menu';
import { FakeNewsFeed } from './static_data/news';
import { FakeThemes } from './static_data/themes';
import { FakeHelpData } from './static_data/help';


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
                return ok( FakeNewsFeed );

            case url.endsWith('/api/menu') && method === 'GET':
                return ok( FakeMenu );

            case url.endsWith('/api/theme/default') && method === 'GET':
                return ok( 'light-theme' );

            case url.endsWith('/api/theme/list') && method === 'GET':
                return ok( FakeThemes ); 

            case url.endsWith( '/api/backend/version' ) && method === 'GET':
                const versionData: any = {
                    version: '2.23.1234'
                }
                return ok( versionData );

            case url.endsWith( '/api/help/general' ) && method === 'GET':
                return ok( FakeHelpData );

            default:
                // pass through any requests not handled above
                return next.handle(request);
            }    
        }          
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
