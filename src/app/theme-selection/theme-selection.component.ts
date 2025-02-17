import { Component } from '@angular/core';
import { ThemeStyleManager } from './theme-style-manager.service';
import { MbsThemeService, Theme } from './mbs-theme.service';


@Component({
  selector: 'app-theme-selection',
  templateUrl: './theme-selection.component.html',
  styleUrls: ['./theme-selection.component.scss']
})
export class ThemeSelectionComponent 
{
    themes:         Theme[] = [];
    selectedTheme:  Theme = MbsThemeService.defaultTheme;
    
    constructor( public styleManager: ThemeStyleManager, private themeService: MbsThemeService ) 
    { 
        this.themeService.getThemes().subscribe( data => this.themes = data );
        const themeName = localStorage.getItem( 'theme' );
        this.selectedTheme = this.selectTheme( themeName ? themeName : MbsThemeService.defaultTheme.name );
        return;
    }
   
    public selectTheme( $event: any ): Theme 
    {
        if ( !$event.value )
        {
            return ( MbsThemeService.defaultTheme );
        }
        console.log( 'selectTheme', $event.value.name );
        const theme = this.themeService.findTheme( $event.value.name );
        if ( theme ) 
        {
            this.themeService.updateTheme( theme );
            this.styleManager.removeStyle( 'theme' );
            this.styleManager.setStyle( 'theme', `${theme.name}.css` );
            localStorage.setItem( 'theme', theme.name );
            return theme;
        }
        return ( MbsThemeService.defaultTheme );
    }
}
