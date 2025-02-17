import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { IPagedRequest, IPagesResponse } from "./ngx-crud.models";
import { NgxCrudService } from "./ngx-crud.service";



export class NgxCrudDataSource<T> implements DataSource<T>
{
    private tableSubject    = new BehaviorSubject<T[]>([]);
    private loadingSubject  = new BehaviorSubject<boolean>(false);
    
    public loading$         = this.loadingSubject.asObservable();
    public paginator!:      MatPaginator;
    
    constructor( private crudService: NgxCrudService<T> ) 
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

    public load( paged_parameters: IPagedRequest ) 
    {
        this.loadingSubject.next( true );
        this.crudService.paged( paged_parameters ).pipe( catchError( () => of( [] ) ),
            finalize(() => this.loadingSubject.next( false) )
            
        ).subscribe( ( response: IPagesResponse<T> | any ) => { 
            this.tableSubject.next( response.records ); 
            if ( this.paginator )
            {
                this.paginator.length = response.count;
            }
        } );
        return 
    }     
}
