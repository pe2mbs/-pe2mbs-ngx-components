import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable( { 
    providedIn: 'root' 
} )
export class AuthGuard implements CanActivate {
    constructor( private router: Router ) 
    {
        return;
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) 
    {
        const token = sessionStorage.getItem( 'token' );
        if ( token ) 
        {
            // authorised so return true
            return ( true );
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate( [ '/login' ], { queryParams: { returnUrl: state.url } } );
        return ( false );
    }
}
