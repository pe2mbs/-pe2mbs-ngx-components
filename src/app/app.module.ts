import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MbsMenubarModule } from 'projects/pe2mbs/ngx-mbs-menubar/src/public-api';
import { MbsNewsbarModule } from 'projects/pe2mbs/ngx-mbs-newsbar/src/public-api';
import { MbsOnePageModule } from 'projects/pe2mbs/ngx-mbs-one-page/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './helpers/fake-backend-interceptor';
import { MbsThemeDirective } from './theme-selection/mbs-theme.directive';
import { ThemeSelectionComponent } from './theme-selection/theme-selection.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MbsFooterModule } from 'projects/pe2mbs/ngx-mbs-footer/src/public-api';
import { MbsHeaderModule } from 'projects/pe2mbs/ngx-mbs-header/src/public-api';
import { MbsVtoolbarModule } from 'projects/pe2mbs/ngx-mbs-vtoolbar/src/public-api';


@NgModule({
    declarations: [
        AppComponent,
        MbsThemeDirective,
        ThemeSelectionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatButtonModule,
        MatRadioModule,
        MatIconModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MbsMenubarModule,
        MbsNewsbarModule,
        MbsHeaderModule,
        MbsFooterModule,
        MbsOnePageModule,
        MbsVtoolbarModule,
    ],
    providers: [
        fakeBackendProvider,
        { provide: 'MbsNewsFeedUri', useValue: '/api/rss/newsfeed' }, 
        { provide: 'MbsMenuUri', useValue: '/api/menu' },
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA 
    ]
})
export class AppModule { }
