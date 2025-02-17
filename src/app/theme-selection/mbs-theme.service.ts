import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Theme 
{
    name: string;
    displayName: string;
    accent?: string;
    primary?: string;
    isDark?: boolean;
    isDefault?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class MbsThemeService 
{
    static defaultTheme: Theme = {
        displayName: 'Light theme',
        name: 'light-theme',
        isDark: false,
        isDefault: true,
    };
    
    public themes: Theme[] = [];
    
    private themeSUB = new BehaviorSubject( MbsThemeService.defaultTheme ); // stores the current theme
    public  themeOBS = this.themeSUB.asObservable();
    
    constructor( private http: HttpClient ) 
    { 
        this.getThemes().subscribe( data => this.themes = data );
        return;
    }

    public getThemes(): Observable<Theme[]>
    {
        return ( this.http.get<Theme[]>( '/api/themes' ).pipe( catchError( this.handleError( 'getThemes', [ MbsThemeService.defaultTheme ] ) ) ) );
    }

    public getTheme(): Observable<string>
    {
        return ( this.http.get<string>( '/api/theme' ).pipe( catchError( this.handleError( 'getTheme', "worldline-theme" ) ) ) );
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
            console.warn( "Returning a default theme data" );
            return of( result as T );
        };
    }    
    
    public updateTheme( theme: Theme ): void 
    {
        this.themeSUB.next( theme );
        return;
    }
    
    public findTheme( themeName: string): Theme | undefined 
    {
        return ( this.themes.find( currentTheme => currentTheme.name === themeName ) );
    }
}
