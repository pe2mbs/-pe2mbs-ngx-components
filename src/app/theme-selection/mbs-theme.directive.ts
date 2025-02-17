import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { MbsThemeService } from './mbs-theme.service';
import { Subscription } from 'rxjs';


@Directive({
    selector: '[mbsTheme]'
} )
export class MbsThemeDirective implements OnInit, OnDestroy
{
    @Input( 'mbsTheme' )    theme!: string

    private sub: Subscription | null = null;

    constructor( private themeService: MbsThemeService ) 
    { 
        return;
    }

    public ngOnInit(): void 
    {
        const body = document.getElementsByTagName( 'body' )[ 0 ];
        if ( this.theme != '' )
        {
            body.classList.add( this.theme );
        }
        this.sub = this.themeService.getTheme().subscribe( theme => {
            if ( body.classList.contains( this.theme ) )
            {
                body.classList.remove( this.theme ) ;
            }
            this.theme = theme;
            body.classList.add( this.theme );
        } );
        return;
    }

    public ngOnDestroy(): void
    {
        if ( this.sub )
        {
            this.sub.unsubscribe()
        }
        return;
    }
}
