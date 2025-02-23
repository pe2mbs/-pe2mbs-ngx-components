import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { IMbsActionButton, IMbsColumn, IMbsColumnButton, MbsCrudDataSource, MbsCrudService } from 'projects/pe2mbs/ngx-mbs-crud-table/src/public-api';


export interface ISample_Data
{
    SSN: string;
    gender: string;
    birthdate: string;
    maiden_name: string;
    last_name: string;
    first_name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    cc_type: string;
    CCN: string;
    cc_cvc: string;
    cc_expiredate: string;
};

@Injectable( {
   providedIn: 'root' 
} )
export class DemoCrudService extends MbsCrudService<ISample_Data>
{
    constructor( http: HttpClient )
    {
        super( '/api/demo-table', http );
    }
}


class DemoCrudDataSource extends MbsCrudDataSource<ISample_Data>
{
    constructor( service: DemoCrudService ) 
    {
        super( service );
        return;
    }
}


@Component({
  selector: 'app-test-crud',
  templateUrl: './test-crud.component.html',
  styleUrls: ['./test-crud.component.scss']
})
export class TestCrudComponent implements OnInit 
{
    dataSource: DemoCrudDataSource;
    public columns: IMbsColumn[] = [
        { field: 'SSN',         caption: 'SSN',             width: '100px', active: false },
        { field: 'gender',      caption: 'Gender',          width: '50px', active: false, sort: true, filter: true },
        { field: 'birthdate',   caption: 'Birthdate',       width: '100px', active: false, sort: true, filter: true },
        { field: 'first_name',  caption: 'First Name',      width: '20%', active: true, sort: true, filter: true },
        { field: 'last_name',   caption: 'Last Name',       width: '20%', active: true, sort: true, filter: true },
        { field: 'maiden_name', caption: 'Maiden Name',     width: '20%', active: true, sort: true, filter: true },
        { field: 'address',     caption: 'Address',         width: '20%', active: true, sort: true, filter: true },
        { field: 'city',        caption: 'City',            width: '20%', active: true, sort: true, filter: true },
        { field: 'state',       caption: 'State',           width: '20%', active: false, sort: true, filter: true },
        { field: 'zip',         caption: 'Zip code',        width: '20%', active: false, sort: true, filter: true },
        { field: 'phone',       caption: 'Phone',           width: '20%', active: false, sort: false, filter: true },
        { field: 'email',       caption: 'Email',           width: '20%', active: false, sort: false, filter: true },
        { field: 'cc_type',     caption: 'Creditcard',      width: '20%', active: false, sort: true, filter: true },
        { field: 'CCN',         caption: 'Account number',  width: '20%', active: false, sort: true, filter: true },
        { field: 'cc_cvc',      caption: 'CVC code',        width: '10%', active: false, sort: false, filter: true },
        { field: 'cc_expiredate', caption: 'Expire Date',   width: '10%', active: false, sort: false, filter: true },
        { field: "options",     caption: 'Options',         width: '100px', active: true, buttons: [
            /* 
            *    This column is always fixed in the view
            *
            */
            { 
                icon: 'edit', 
                action: this.onHelp 
            },
            { 
                icon: 'print', 
                action: this.onHelp 
            },
            { 
                icon: 'delete', 
                action: this.onHelp 
            },
            
        ] }
    ];

    constructor( private service: DemoCrudService ) 
    { 
        this.dataSource = new DemoCrudDataSource( service );
        return;
    }

    public ngOnInit(): void 
    {
        return;
    }

    public onAction( action: IMbsColumnButton, row: ISample_Data )
    {
        console.log( 'action', action, row );
        action.action( row );
        return;
    }

    public onHelp( $event: any )
    {
        console.log( 'help', $event );
    }

    public onClick( $event: any )
    {
        console.log( 'onClick', $event );
    }

}
