import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface IMbsThemeItem 
{
    name:           string;
    displayName:    string;
    accent?:        string;
    primary?:       string;
    isDark?:        boolean;
    isDefault?:     boolean;
}


export interface IMbsThemeData
{
    uri:            string
    theme:          IMbsThemeItem;
}


@Injectable({
    providedIn: 'root'
})
export class MbsThemeSelectService 
{
    static defaultTheme: IMbsThemeItem = {
        displayName: 'Light theme',
        name: 'light-theme',
        isDark: false,
        isDefault: true,
    };
    
    public themes: IMbsThemeItem[] = [];
    
    private themeSUB = new BehaviorSubject( MbsThemeSelectService.defaultTheme ); // stores the current theme
    public  themeOBS = this.themeSUB.asObservable();
    
    /**
    *   The constructor getting the theme data.
    *  
    */
    constructor( private http: HttpClient, @Inject('MbsTheme') @Optional() private info?: IMbsThemeData ) 
    { 
        if ( this.info )
        {
            this.themeSUB.next( this.info.theme )
        }
        this.getThemes().subscribe( data => this.themes = data );
        return;
    }
    /**
    *   Retrieves the list of themes from backend.
    * 
    *   @returns  an observable to an array of IMbsThemeItem.
    */
    public getThemes(): Observable<IMbsThemeItem[]>
    {
        let lUri = '/api/theme'
        if ( this.info?.uri )
        {
            lUri = this.info.uri;
        }
        lUri += '/list';
        return ( this.http.get<IMbsThemeItem[]>( lUri ).pipe( catchError( this.handleError( 'getThemes', 
                                                    [ this.info?.theme || MbsThemeSelectService.defaultTheme ] ) ) ) );
    }
    
    /**
    *   Retrieves the default theme from the backend.
    * 
    *   @returns  an observable to an string (name).
    */
    public getTheme(): Observable<string>
    {
        let lUri = '/api/theme'
        if ( this.info?.uri )
        {
            lUri = this.info.uri;
        }
        lUri += '/default';
        return ( this.http.get<string>( lUri ).pipe( catchError( this.handleError( 'getTheme', 
                                                  this.info?.theme.name || "default-theme" ) ) ) );
    }

    /**
    *   Handle Http operation that failed.
    *   Let the app continue.
    * 
    *   @param operation  - name of the operation that failed.
    *   @param result     - optional value to return as the observable result.
    *   
    *   @return   observable of type T.
    */
    private handleError<T>( operation = 'operation', result?: T ) 
    {
        return ( error: any ): Observable<T> => {
            // Let the app keep running by returning an empty result.
            console.warn( "Returning a default theme data" );
            return of( result as T );
        };
    }    
    
    /**
    *   Set the theme to be broadcasted to the listening components.
    * 
    *   @param theme: string    the theme item to be used.
    *  
    *   @returns      nothing.
    */
    public updateTheme( theme: IMbsThemeItem ): void 
    {
        this.themeSUB.next( theme );
        return;
    }
    
    /**
    *   Find the theme by name.
    * 
    *   @param themeName: the theme (name).
    *  
    *   @returns    undefined when theme was not found, otherwise the theme data item. 
    */
    public findTheme( themeName: string): IMbsThemeItem | undefined 
    {
        return ( this.themes.find( currentTheme => currentTheme.name === themeName ) );
    }
}
