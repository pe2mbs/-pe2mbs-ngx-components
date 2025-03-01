/**
*   Angular 12 CRUD service for filtering, sorting and paging on backend.  
* 
*   Copyright (C) 2020-2025  Marc Bertens-Nguyen  <m.bertens@pe2mbs.nl>
*
*   This program is free software; you can redistribute it and/or
*   modify it under the terms of the GNU General Public License
*   as published by the Free Software Foundation; only version 2.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program; if not, see <https://www.gnu.org/licenses/>.
**/
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ECrudOption, ICrudTableInfo, IMbsCrudStatus, IMbsPagedRequest, 
         IMbsPagesResponse, IMbsSelectList } from './mbs-crud.models';


export class MbsCrudService<T> 
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

    protected uri: string = '/api'
    protected tableInfo!: ICrudTableInfo;
    constructor( uri: string, protected http: HttpClient ) 
    { 
        this.uri = uri;
        if ( !this.uri.endsWith( '/' ) )
        {
            this.uri += '/';
        }
        // This is called to the backend with the user-id, via the interceptor.
        // Therefore the rights are user rights.
        this.getTableInfo().then( (data: ICrudTableInfo) => {
            this.tableInfo = data;
        } );
        return;
    }

    protected async getTableInfo(): Promise<ICrudTableInfo>
    {
        /**
        *   Retieves the table information including user rights.
        * 
        *   @returns:       Promise of table info.
        */
        return ( await this.http.post<ICrudTableInfo>( this.composeUri( 'info' ), {} ).toPromise() );
    }

    protected composeUri( uri_part: string ): string
    {
        /**
        *   Build the uri for the call based on the base uri  
        * 
        *   @param uri_part:    the actual function on the backend.
        *   
        *   @returns:           The URI for the operation as string.
        */
        if ( uri_part.startsWith( '/' ) )
        {
            return ( `${this.uri}${uri_part.substring(1)}` );
        }
        return ( `${this.uri}${uri_part}` );
    }

    // CREATE
    public put( record: T ): Observable<IMbsCrudStatus>
    {
        /**
        *   Create new record in the database
        *
        *   @param record:      The contents of the record to be stored into the database
        *                       the primary key field shall be ignored when the field is
        *                       auto-numbering.
        * 
        *   @returns:           Observable with the status.
        */
        return ( this.http.post<IMbsCrudStatus>( this.composeUri( 'put' ), record ) );
    }

    // READ
    public paged( parameters: IMbsPagedRequest ): Observable<IMbsPagesResponse<T>>
    {
        /**
        *   Retrieve a paged list 
        *
        *   @param parameters:  Paging information
        * 
        *   @returns            Observable array of records.
        *
        *   Note: Here the page and pageSize are not used.
        */
        return ( this.http.post<IMbsPagesResponse<T>>( this.composeUri( 'paged' ), parameters ) );
    }

    public all( parameters: IMbsPagedRequest ): Observable<Array<T>>
    {
        /**
        *   Retrieve a full record list
        *   
        *   @param parameters:  Not used.
        * 
        *   @returns            Observable array of records
        *
        *   @note               this can be a dangerous call with very large tables.
        */
        return ( this.http.post<Array<T>>( this.composeUri( 'all' ), {} ) );
    }

    public get( id: number ): Observable<T>
    {
        /**
        *   Get a record by its ID.
        *   
        *   @param id:          The primary key id of the record.
        * 
        *   @returns:           An observable with the contents of the record from the database.
        * 
        */
        return ( this.http.post<T>( this.composeUri( 'get' ), { id } ) );
    }

    public select(): Observable<Array<IMbsSelectList>>
    {
        /**
        *   This returns a list with objects containing id and value
        *
        *   @returns            Obserable array of objects with label and value.
        */
        return ( this.http.post<Array<IMbsSelectList>>( this.composeUri( 'select' ), {} ) );
    }

    // UPDATE
    public update( record: T ): Observable<IMbsCrudStatus>
    {
        /**
        *   Update a record by its primary key value.
        * 
        *   @param record:      The contents of the record to be updated in the database
        *                       the primary key field is used to identify the record in the 
        *                       database.
        *   
        *   @returns:           Observable with the status.
        */
        return ( this.http.post<IMbsCrudStatus>( this.composeUri( 'update' ), record ) );
    }

    // DELETE
    public delete( id: number ): Observable<IMbsCrudStatus>
    {
        /**
        *   Delete a record by its primary key.
        *   
        *   @param id:          The primary key id of the record.
        *   
        *   @returns:           Observable with the status.
        */
        return ( this.http.post<IMbsCrudStatus>( this.composeUri( 'delete' ), { id } ) );
    }

    public primaryKey(): string
    {
        /**
        *   Returns the primary key of the backend database.
        * 
        *   @returns:           String with the primary key field name.  
        */
        return ( this.tableInfo.primary_key );
    }

    public secondaryKey(): string
    {
        /**
        *   Returns the secondary key of the backend database.
        * 
        *   @returns:           String with the secondary key field name.  
        */
        return ( this.tableInfo.secondary_key );
    }

    public isCrudOption( option: ECrudOption ): boolean
    {
        /**
        *   Request if the user is allowed a CRUD method.
        * 
        *   @param option:      The CRUD option to check if the user is allowed tp perform. 
        * 
        *   @returns:           Boolean true or false for the requested method. 
        */
        return ( ( option == ECrudOption.Create && this.tableInfo.rights.create ) || 
                 ( option == ECrudOption.Read   && this.tableInfo.rights.read ) ||
                 ( option == ECrudOption.Update && this.tableInfo.rights.write ) || 
                 ( option == ECrudOption.Delete && this.tableInfo.rights.delete ) );
    }
}
