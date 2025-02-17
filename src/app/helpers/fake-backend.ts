import { IAuthStatusResponse, User } from '../models/user';
import { FakeCrudBackend } from '../../../projects/ngx-crud/src/lib/fake-crud';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PeriodicElement } from '../home/table/table/table.models';


export class FakePeriodicElement extends FakeCrudBackend<PeriodicElement>
{
    static ELEMENT_DATA: PeriodicElement[] = [
        { position: 1,  name: 'Hydrogen',   weight: 1.0079,   symbol: 'H'   },
        { position: 2,  name: 'Helium',     weight: 4.0026,   symbol: 'He'  },
        { position: 3,  name: 'Lithium',    weight: 6.941,    symbol: 'Li'  },
        { position: 4,  name: 'Beryllium',  weight: 9.0122,   symbol: 'Be'  },
        { position: 5,  name: 'Boron',      weight: 10.811,   symbol: 'B'   },
        { position: 6,  name: 'Carbon',     weight: 12.0107,  symbol: 'C'   },
        { position: 7,  name: 'Nitrogen',   weight: 14.0067,  symbol: 'N'   },
        { position: 8,  name: 'Oxygen',     weight: 15.9994,  symbol: 'O'   },
        { position: 9,  name: 'Fluorine',   weight: 18.9984,  symbol: 'F'   },
        { position: 10, name: 'Neon',       weight: 20.1797,  symbol: 'Ne'  },
        { position: 11,  name: 'Hydrogen',   weight: 1.0079,   symbol: 'H'   },
        { position: 12,  name: 'Helium',     weight: 4.0026,   symbol: 'He'  },
        { position: 13,  name: 'Lithium',    weight: 6.941,    symbol: 'Li'  },
        { position: 14,  name: 'Beryllium',  weight: 9.0122,   symbol: 'Be'  },
        { position: 15,  name: 'Boron',      weight: 10.811,   symbol: 'B'   },
        { position: 16,  name: 'Carbon',     weight: 12.0107,  symbol: 'C'   },
        { position: 17,  name: 'Nitrogen',   weight: 14.0067,  symbol: 'N'   },
        { position: 18,  name: 'Oxygen',     weight: 15.9994,  symbol: 'O'   },
        { position: 19,  name: 'Fluorine',   weight: 18.9984,  symbol: 'F'   },
        { position: 20, name: 'Neon',       weight: 20.1797,  symbol: 'Ne'  },
    ];

    public get uri(): string { return ( '/api/periodic-element' ) }

    constructor()
    {
        super( FakePeriodicElement.ELEMENT_DATA, 'position' );
        return;
    }
}

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
