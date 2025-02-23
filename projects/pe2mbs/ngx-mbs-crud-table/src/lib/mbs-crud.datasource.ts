import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { IMbsPagedRequest, IMbsPagesResponse } from "./mbs-crud.models";
import { MbsCrudService } from "./mbs-crud.service";



export class MbsCrudDataSource<T> implements DataSource<T>
{
    public tableSubject    = new BehaviorSubject<T[]>([]);
    public loadingSubject  = new BehaviorSubject<boolean>(false);
    
    public loading$         = this.loadingSubject.asObservable();
    public paginator!:      MatPaginator;
    
    constructor( private crudService: MbsCrudService<T> ) 
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
}
