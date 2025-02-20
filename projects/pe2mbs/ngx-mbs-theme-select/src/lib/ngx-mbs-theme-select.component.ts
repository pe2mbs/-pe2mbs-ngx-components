import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { IMbsThemeItem, MbsThemeSelectService } from './ngx-mbs-theme-select.service';
import { MbsThemeManagerService } from './ngx-mbs-theme-manager.service';
import { Subscription } from 'rxjs';


@Injectable()
export class MbsThemeBase implements OnInit, OnDestroy
{
    public themes:         IMbsThemeItem[] = [];
    public selectedTheme:  IMbsThemeItem = MbsThemeSelectService.defaultTheme;
    protected sub:    Subscription = new Subscription();
    
    constructor( public themeService: MbsThemeSelectService,
                 private styleManager: MbsThemeManagerService )
    {
        return;
    }

    public ngOnInit(): void 
    {
        this.sub.add( this.themeService.getThemes().subscribe( data => this.themes = data ) );
        this.sub.add( this.themeService.getTheme().subscribe( (theme_name: string) => {
            this.selectedTheme = this.selectTheme( theme_name ? theme_name : 
                                                  MbsThemeSelectService.defaultTheme.name );
        } ) );
        return;      
    }
    
    public ngOnDestroy(): void 
    {
        this.sub.unsubscribe();
        return;
    }

    public selectTheme( $event: any ): IMbsThemeItem 
    {
        if ( !$event.value )
        {
            return ( MbsThemeSelectService.defaultTheme );
        }
        console.log( 'selectTheme', $event.value.name );
        const theme = this.themeService.findTheme( $event.value.name );
        if ( theme ) 
        {
            this.setTheme( theme );
            return ( theme );
        }
        return ( MbsThemeSelectService.defaultTheme );
    }

    public setTheme( theme: IMbsThemeItem ): void
    {
        this.themeService.updateTheme( theme );
        this.styleManager.removeStyle( 'theme' );
        this.styleManager.setStyle( 'theme', `${theme.name}.css` );
        return;
    }
}


@Component({
    selector: 'mbs-theme-select',
    template: `<mat-radio-group aria-labelledby="Select Language" class="select-language"
    [(ngModel)]="selectedTheme">
    <mat-radio-button class="select-language-radio-button" style="margin-right: 10px;"
            *ngFor="let theme of themes" [value]="theme" (change)="selectTheme( $event )">
        {{ theme.displayName }}
    </mat-radio-button>
</mat-radio-group>
    `,
    styles: [ `
.select-language
{
    //padding:        5px 10px;
    display:        flex;
    flex-direction: column;
    overflow:       hidden;
} 

.select-language-radio-button
{
    padding:        5px 10px;
}
` ]
})
export class MbsThemeSelectComponent extends MbsThemeBase implements OnInit, OnDestroy
{   
    constructor( themeService: MbsThemeSelectService,
                 styleManager: MbsThemeManagerService ) 
    {
        super( themeService, styleManager )
        return;
    }
}
