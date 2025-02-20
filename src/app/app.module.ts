import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MbsNewsbarModule } from 'projects/pe2mbs/ngx-mbs-newsbar/src/public-api';
import { MbsOnePageModule } from 'projects/pe2mbs/ngx-mbs-one-page/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './helpers/fake-backend-interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MbsFooterModule } from 'projects/pe2mbs/ngx-mbs-footer/src/public-api';
import { MbsHeaderModule } from 'projects/pe2mbs/ngx-mbs-header/src/public-api';
import { MbsVtoolbarModule } from 'projects/pe2mbs/ngx-mbs-vtoolbar/src/public-api';
import { IMbsThemeData, MbsThemeSelectModule } from 'projects/pe2mbs/ngx-mbs-theme-select/src/public-api';
import { TestCrudComponent } from './test-crud/test-crud.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { TestDiffEditorComponent } from './test-diff-editor/test-diff-editor.component';
import { MbsMenubarModule } from 'projects/pe2mbs/ngx-mbs-menubar/src/public-api';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


@NgModule({
    declarations: [
        AppComponent,
        TestCrudComponent,
        TestEditorComponent,
        TestDiffEditorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        MbsThemeSelectModule,
        FontAwesomeModule,
    ],
    exports:[
        FontAwesomeModule
    ],
    providers: [
        fakeBackendProvider,
        { provide: 'MbsNewsFeedUri', useValue: '/api/rss/newsfeed' }, 
        { provide: 'MbsMenuUri', useValue: '/api/menu' },
        { provide: 'MbsThemeData', useValue: { uri: '/api/theme',
                                               theme: { displayName: 'Light theme',
                                                        name: 'light-theme',
                                                        isDark: false,
                                                        isDefault: true } } as IMbsThemeData }
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [ 
        CUSTOM_ELEMENTS_SCHEMA 
    ]
})
export class AppModule 
{ 
    constructor( library: FaIconLibrary, faConfig: FaConfig ) 
    {
        library.addIconPacks( fas, fab, far );
    }
}
