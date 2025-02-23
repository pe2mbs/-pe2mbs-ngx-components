import { HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { EMbsFilterModes, IMbsSelectList } from "./mbs-crud.models";


type RouteFunction = ( url: string, method: string, headers: any, body: string ) => void;


export abstract class FakeCrudBackend<T>  
{
    public abstract get uri(): string;
    private specialRoutes: Array<any> = new Array<any>();

    constructor( private table: Array<T>, private primary_key: string ) 
    {
        return;
    }

    protected registerRoute( route: string, fn: RouteFunction )
    {
        this.specialRoutes.push( { route, fn } ) ;
        return;
    }


    private findRecord( id: number ): number
    {
        for ( let i = 0; i < this.table.length; i++ )
        {
            if ( id == (this.table[ i ] as any)[ this.primary_key ] )
            {
                return ( i );
            }
        }
        return ( -1 );
    }

    public handleRoute( request: HttpRequest<any>, next: HttpHandler ): any
    {
        // if ( !this.isLoggedIn( request.headers ) )
        // {
        //     return ( this.unauthorized() )
        // }
        let index: number = -1;
        const { url, method, headers, body } = request;
        const urlArray = url.split('/')
        const data = urlArray[ urlArray.length - 1 ]
        const reqData: any = body;
        switch ( true )
        {
        case data == 'paged':
            const start = reqData.pageSize * reqData.page;
            let result: Array<T> = this.table.slice();
            if ( Array.isArray( reqData.filters ) )
            {
                function filterRecord( record: any, filter_info: any ): boolean
                {
                    let result = false;
                    switch ( filter_info.mode as EMbsFilterModes )
                    {
                    case EMbsFilterModes.Contains:
                        result = record[ filter_info.column ].includes( filter_info.value );
                        break;

                    case EMbsFilterModes.Equal:
                        result = record[ filter_info.column ] == filter_info.value;
                        break;

                    case EMbsFilterModes.NotEmpty:
                        result = record[ filter_info.column ] != filter_info.value;
                        break;
        
                    case EMbsFilterModes.Empty:
                        result = record[ filter_info.column ] == '';
                        break;

                    case EMbsFilterModes.NotEmpty:
                        result = record[ filter_info.column ] != '';
                        break;

                    case EMbsFilterModes.Startswith:
                        result = record[ filter_info.column ].startsWith( filter_info.value );
                        break;

                    case EMbsFilterModes.Endswith:
                        result = record[ filter_info.column ].endsWith( filter_info.value );
                        break;
                    default:
                        break;
                    }
                    return ( result );
                }
                reqData.filters.forEach( (filterSet:any) => {
                    result = result.filter((record: any) => filterRecord( record, filterSet ) );
                } );
            }
            if ( reqData.sorted && reqData.sorted.algorithm != '' )
            {
                if ( reqData.sorted.algorithm == 'asc' )
                {
                    result = result.sort( (a: any, b: any) => ( a[ reqData.sorted.column ] > b[ reqData.sorted.column ] ? -1 : 1 ) );
                }
                else
                {
                    result = result.sort( (a: any, b: any) => ( a[ reqData.sorted.column ] < b[ reqData.sorted.column ] ? -1 : 1 ) );
                }
            }
            return this.ok( { records: result.slice( start, start + reqData.pageSize ), count: this.table.length } );

        case data == 'all':
            return this.ok( this.table );

        case data == 'select':
            // Get the column
            if ( typeof reqData.column == 'string' )
            {
                let result: Array<IMbsSelectList> = new Array<IMbsSelectList>();
                for ( let i = 0; i < this.table.length; i++ )
                {
                    const record: any = this.table[ i ];
                    result.push( { id: record[ this.primary_key ], value: record[ reqData.column ] } );
                }
                if ( reqData.filter )
                {
                    
                }
                if ( reqData.sort )
                {
                    if ( reqData.sort.direction == 'asc' )
                    {
                        result = result.sort( (a, b) => ( a.value > b.value ? -1 : 1 ) );
                    }
                    else
                    {
                        result = result.sort( (a, b) => ( a.value < b.value ? -1 : 1 ) );
                    }
                }
                return this.ok( result );
            }
            // Get the columns
            else if ( Array.isArray( reqData.column ) )
            {
                let result: Array<IMbsSelectList> = new Array<IMbsSelectList>();
                for ( let i = 0; i < this.table.length; i++ )
                {
                    const record: any = this.table[ i ];
                    let values: Array<string> = new Array<string>();
                    for ( let j = 0; j < reqData.column.length; j++ )
                    {
                        values.push( String( record[ reqData.column ] ) );
                    }
                    result.push( { id: record[ this.primary_key ], value: values.join( ' - ' ) } );
                }
                return this.ok( result );
            }
            return ( this.error( `Invalid parameters: [${reqData.column}]` ) )
    
        case data == 'get':
            index = this.findRecord( reqData.id );
            if ( index >= 0 )
            {
                return ( this.ok( this.table[ index ] ) ); 
            }
            break;

        case data == 'put':
            if ( reqData.id == null )
            {
                reqData.id = this.table.length; 
                this.table.push( reqData );
                return ( this.ok( { status: true, message: 'record added' } ) );
            }
            break;

        case data == 'update':
            index = this.findRecord( reqData.id );
            if ( index >= 0 )
            {
                this.table[ index ] = reqData;
                return ( this.ok( { status: true, message: 'record updated' } ) );
            }
            break;

        case data == 'delete':
            index = this.findRecord( reqData.id );
            if ( index >= 0 )
            {
                this.table = this.table.splice( index, 1 );
            }
            break;

        case data == 'lock':
            index = this.findRecord( reqData.id );
            if ( index >= 0 )
            {
                return ( this.ok( { status: true, message: 'record locked' } ) );
            }
            break;

        case data == 'unlock':
            index = this.findRecord( reqData.id );
            if ( index >= 0 )
            {
                return ( this.ok( { status: true, message: 'record unlocked' } ) );
            }
            break;               

        default:
            for ( let i = 0; i < this.specialRoutes.length; i++ )
            {
                if ( this.specialRoutes[ i ].route == data ) 
                {
                    return this.ok( this.specialRoutes[ i ].fn( url, method, headers, body ) ); 
                }
            }
            return next.handle( request );

        }
        return ( this.error( "Record not found" ) )
    }

    public ok( body?: any ) 
    {
        return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500)); // delay observable to simulate server api call
    }

    public error( message: string ) 
    {
        return throwError(() => ({ error: { message } }))
            .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    public unauthorized() 
    {
        return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
            .pipe(materialize(), delay(500), dematerialize());
    }

    public isLoggedIn( headers: any ): boolean
    {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
};