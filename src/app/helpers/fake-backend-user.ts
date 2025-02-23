
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FakeCrudBackend } from 'projects/pe2mbs/ngx-mbs-crud-table/src/lib/mbs-fake-crud';


export class FakeUsers extends FakeCrudBackend<User>
{
    static USER_TABLE: User[] = [
        { 
            id:            1,
            username:      'test',
            password:      '123456',
            firstName:     'test',
            lastName:      'test'
        },
        { 
            id:            1,
            username:      'A480226',
            password:      'A480226',
            firstName:     'Marc',
            lastName:      'Bertens-Nguyen'
        }
    ];

    public get uri(): string { return ( '/api/users' ) }

    constructor()
    {
        super( FakeUsers.USER_TABLE.slice(), 'id' );
        console.log( 'FakeUsers', this.table );
        this.registerRoute( 'login', this.login );
        this.registerRoute( 'logout', this.logout );
        this.registerRoute( 'register', this.register );
        return;
    }

    public login( url: string, method: string, headers: any, body: any )
    {
        let response: IAuthStatusResponse = {
            status:         false,
            message:        'Username or password invalid',
            code:           403,
        }
        const user = this.table.filter( element => element.username == body.username );
        if ( user.length == 1 )
        {
            response.user     = user[ 0 ];
            response.status   = true;
            response.message  = '';
            response.code     = 200;
        }
        return ( this.ok( response ) );   
    }

    public logout( url: string, method: string, headers: any, body: string ): Observable<HttpResponse<any>>
    {
        return ( this.error( "" ) );   
    }

    public register( url: string, method: string, headers: any, body: string ): Observable<HttpResponse<any>>
    {
        return ( this.error( "" ) );   
    }

}
