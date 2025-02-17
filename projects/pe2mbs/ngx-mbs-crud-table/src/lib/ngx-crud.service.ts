import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICrudStatus, IPagedRequest, IPagesResponse, ISelectList } from './ngx-crud.models';


export class NgxCrudService<T> 
{
    /**
    *   CRUD base service class 
    *   
    *   Standard API:
    *     Create          put  
    *     Read            paged
    *                     get
    *     Update          update
    *     Delete          delete
    * 
    *   Extra API:
    *     Full list       all
    *     Select list     select         
    **/

    protected url: string = '/api'

    constructor( url: string, protected http: HttpClient ) 
    { 
        this.url = url;
        if ( !this.url.endsWith( '/' ) )
        {
            this.url += '/';
        }
        return;
    }

    protected composeUri( url_part: string ): string
    {
        if ( url_part.startsWith( '/' ) )
        {
            return ( `${this.url}${url_part.substring(1)}` );
        }
        return ( `${this.url}${url_part}` );
    }

    // CREATE
    public put( record: T ): Observable<ICrudStatus>
    {
        /*
        * Create new record in the database
        */
        return ( this.http.post<ICrudStatus>( this.composeUri( 'put' ), record ) );
    }

    // READ
    public paged( parameters: IPagedRequest ): Observable<IPagesResponse<T>>
    {
        /*
        * Retrieve a paged list 
        */
        // Here the page and pageSize are not used.
        return ( this.http.post<IPagesResponse<T>>( this.composeUri( 'paged' ), parameters ) );
    }

    public all( parameters: IPagedRequest ): Observable<Array<T>>
    {
        /*
        * Retrieve a full record list 
        *
        * NOTE: this can be a dangerous call with very large tables  
        */
        return ( this.http.post<Array<T>>( this.composeUri( 'all' ), {} ) );
    }

    public get( id: number ): Observable<T>
    {
        /*
        * Get a record by its ID
        */
        return ( this.http.post<T>( this.composeUri( 'get' ), { id } ) );
    }

    public select( ): Observable<Array<ISelectList>>
    {
        /*
        * This returns a list with objects containing id and value
        *
        *
        */
        return ( this.http.post<Array<ISelectList>>( this.composeUri( 'select' ), {} ) );
    }

    // UPDATE
    public update( record: T ): Observable<T>
    {
        /*
        * Update a record by its ID
        */
        return ( this.http.post<T>( this.composeUri( 'update' ), record ) );
    }

    // DELETE
    public delete( id: number ): Observable<ICrudStatus>
    {
        return ( this.http.post<ICrudStatus>( this.composeUri( 'delete' ), { id } ) );
    }
}
