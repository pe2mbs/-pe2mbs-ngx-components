import { Inject, Injectable, Optional } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Renderer, marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser'



export interface IHelpInfo
{
    uri:              string;
    sanitizeHtml:     boolean;
    markedExtension?: marked.MarkedExtension;
} 


@Injectable({
    providedIn: 'root'
})
export class MbsHelpService 
{
    private _renderer: any = new Renderer();

    constructor( private http: HttpClient, 
                 private _domSanitizer: DomSanitizer,
                 @Inject( 'MbsHelp' ) @Optional() private info: IHelpInfo  ) 
    { 
        this._renderer.listitem = function( text: string ) 
        {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text.replace(
                    /^\s*\[ \]\s*/,
                    '<input type="checkbox" class="md-checkbox" disabled> '
                ).replace(
                    /^\s*\[x\]\s*/,
                    '<input type="checkbox" class="md-checkbox" checked disabled> '
                );
                return '<li style="list-style: none">' + text + '</li>';
            } 
            else 
            {
                return '<li>' + text + '</li>';
            }
        };
        this.setMarkedOptions( this.info.markedExtension || {} );
        return;
    }
    /**
    * Trim left whitespace
    */
    private trimLeft( line: string ) 
    {
        return ( line.replace(/^\s+|\s+$/g, '') );
    }

    // get the content from remote resource
    public getHelp( topic: string ): Observable<any> 
    {
        return this.http.get( `${ this.info.uri}/${ topic }`, { responseType: 'text' } ).pipe(
            map( res => this.extractData( res ) ),
            catchError( this.handleError )
        );
    }

    public get renderer(): Renderer 
    {
        return ( this._renderer );
    }

    protected prepare(raw: string) 
    {
        if ( !raw ) 
        {
            return '';
        }
        let isCodeBlock = false;
        return raw.split('\n').map((line: string) => {
            // If the first non-blank chars are an opening/closing code block, toggle the flag
            if ( this.trimLeft(line).substring( 0, 3 ) === '```' ) 
            {
                isCodeBlock = !isCodeBlock;
            }
            return isCodeBlock ? line : line.trim();
        } ).join( '\n' );
    }

    // handle data
    protected extractData( res: any ): string 
    {
        res =  this.prepare( res );
        if ( res ) 
        {
            res = this.compile( res, this.info.sanitizeHtml );
        } 
        return ( res || '' );
    }

    public setMarkedOptions( options: any ): void
    {
        options = Object.assign( {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
        }, options );
        options.renderer = this._renderer;
        marked.setOptions( options );
        return;
    }

    // comple markdown to html
    protected compile( data: string, sanitize = true ): string | null  
    {
        return ( this._domSanitizer.sanitize(
            sanitize ? SecurityContext.HTML : SecurityContext.NONE,
            marked.parse(data).trim()
        ) );
    }

    // handle error
    private handleError( error: HttpErrorResponse ): any 
    {
        const errMsg = error.message ? error.message : error.toString();
        return throwError(errMsg);
    }
}