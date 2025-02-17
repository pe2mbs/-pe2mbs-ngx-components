import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable( {
    providedIn: 'root'
} )
export class MbsMenubarService 
{
    constructor( private http: HttpClient, @Inject('MbsMenuUri') @Optional() private uri?: string ) 
    { 
        return;
    }

    public getMenu(): Observable<any> 
    {
        return ( this.http.get<any[]>( this.uri || '/api/menu' ).pipe( catchError( this.handleError( 'getMenu', [] ) ) ) );
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
            console.warn( "Returning a empty menu" );
            return of( result as T );
        };
    }
}
