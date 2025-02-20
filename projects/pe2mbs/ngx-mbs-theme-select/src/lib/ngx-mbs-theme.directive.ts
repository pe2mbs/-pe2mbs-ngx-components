import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MbsThemeSelectService } from './ngx-mbs-theme-select.service';
import { MbsThemeBase } from './ngx-mbs-theme-select.component';
import { MbsThemeManagerService } from './ngx-mbs-theme-manager.service';


@Directive({
    selector: '[mbsTheme]'
} )
export class MbsThemeDirective extends MbsThemeBase implements OnInit, OnDestroy
{
    private theme!: string

    constructor( themeService: MbsThemeSelectService,
                 styleManager: MbsThemeManagerService ) 
    { 
        super( themeService, styleManager )
        return;
    }

    public ngOnInit(): void 
    {
        super.ngOnInit();   
        const body = document.getElementsByTagName( 'body' )[ 0 ];
        if ( this.theme != '' )
        {
            body.classList.add( this.theme );
        }
        this.sub.add( this.themeService.getTheme().subscribe( theme => {
            if ( body.classList.contains( this.theme ) )
            {
                body.classList.remove( this.theme ) ;
            }
            this.theme = theme;
            body.classList.add( this.theme );
        } ) );
        return;
    }

    public ngOnDestroy(): void
    {
        this.sub.unsubscribe();
        return;
    }
}
