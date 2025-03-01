/**
*   Angular 12 CRUD datasource for filtering, sorting and paging on backend.  
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
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ECrudOption, IMbsPagedRequest, IMbsPagesResponse } from "./mbs-crud.models";
import { MbsCrudService } from "./mbs-crud.service";



export class MbsCrudDataSource<T> implements DataSource<T>
{
    public tableSubject    = new BehaviorSubject<T[]>([]);
    public loadingSubject  = new BehaviorSubject<boolean>(false);
    
    public loading$         = this.loadingSubject.asObservable();
    public paginator!:      MatPaginator;
    
    constructor( public crudService: MbsCrudService<T> ) 
    {
        return;
    }
    
    public connect( collectionViewer: CollectionViewer ): Observable<readonly T[]> 
    {
        return ( this.tableSubject.asObservable() );
    }
    
    public disconnect( collectionViewer: CollectionViewer ): void 
    {
        this.tableSubject.complete();
        this.loadingSubject.complete();
        return;
    }

    public load( paged_parameters: IMbsPagedRequest ) 
    {
        this.loadingSubject.next( true );
        this.crudService.paged( paged_parameters ).pipe( catchError( () => of( [] ) ),
            finalize(() => this.loadingSubject.next( false) )
            
        ).subscribe( ( response: IMbsPagesResponse<T> | any ) => { 
            this.tableSubject.next( response.records ); 
            if ( this.paginator )
            {
                this.paginator.length = response.count;
            }
        } );
        return 
    }     

    public isCrudOption( value: ECrudOption ): boolean
    {
        return ( this.crudService.isCrudOption( value ) )
    }
}
