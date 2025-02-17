import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


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


@Injectable({
    providedIn: 'root'
})
export class MbsNewsService
{
    constructor( private http: HttpClient, @Inject('MbsNewsFeedUri') @Optional() private uri?: string ) 
    { 
        return;
    }

    public getNews(): Observable<INewMessages>
    {
        return ( this.http.get<INewMessages>( this.uri || '/rss/newsfeed' ).pipe( catchError( this.handleError( 'getNewsFeed', {
            enabled: false
        } ) ) ) );
    }

    /**
    *    Handle Http operation that failed.
    *    Let the app continue.
    *    @param operation  - name of the operation that failed
    *    @param result     - optional value to return as the observable result
    */
    private handleError<T>( operation = 'operation', result?: T ) 
    {
        return ( error: any ): Observable<T> => {
            // Let the app keep running by returning an empty result.
            console.warn( "Returning a empty news feed" );
            return of( result as T );
        };
    }
}