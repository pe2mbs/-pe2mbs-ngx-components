import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MbsNewsbarModule } from 'projects/pe2mbs/ngx-mbs-newsbar/src/public-api';
import { MbsOnePageModule } from 'projects/pe2mbs/ngx-mbs-one-page/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './helpers/fake-backend-interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MbsFooterModule } from 'projects/pe2mbs/ngx-mbs-footer/src/public-api';
import { MbsHeaderModule } from 'projects/pe2mbs/ngx-mbs-header/src/public-api';
import { MbsVtoolbarModule } from 'projects/pe2mbs/ngx-mbs-vtoolbar/src/public-api';
import { IMbsThemeData, MbsThemeSelectModule } from 'projects/pe2mbs/ngx-mbs-theme-select/src/public-api';
import { DemoCrudService, TestCrudComponent } from './test-crud/test-crud.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { TestDiffEditorComponent } from './test-diff-editor/test-diff-editor.component';
import { MbsMenubarModule } from 'projects/pe2mbs/ngx-mbs-menubar/src/public-api';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MbsMonacoEditorModule } from 'projects/pe2mbs/ngx-mbs-monaco-editor/src/public-api';
import { MbsCrudTableModule } from 'projects/pe2mbs/ngx-mbs-crud-table/src/public-api';
import { MbsHelpModule } from 'projects/pe2mbs/ngx-mbs-help/src/public-api';
import { TestTreeViewComponent } from './test-tree-view/test-tree-view.component';
import { TestSplitTreeViewComponent } from './test-split-tree-view/test-split-tree-view.component';
import { TreeModule } from 'projects/pe2mbs/ngx-mbs-tree-component/src/public-api';
import { PropertyEditorComponent } from './property-editor/property-editor.component';
import { EditPropertyComponent } from './property-editor/edit-property/edit-property.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        AppComponent,
        TestCrudComponent,
        TestEditorComponent,
        TestDiffEditorComponent,
        TestTreeViewComponent,
        TestSplitTreeViewComponent,
        PropertyEditorComponent,
        EditPropertyComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatIconModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatInputModule,

        
        TreeModule,

        MatToolbarModule,
        MbsMenubarModule,
        MbsNewsbarModule,
        MbsHeaderModule,
        MbsFooterModule,
        MbsOnePageModule,
        MbsVtoolbarModule,
        MbsThemeSelectModule,
        MbsHelpModule,
        MbsCrudTableModule,
        FontAwesomeModule,
        MbsMonacoEditorModule.forRoot(), // use forRoot() in main app module only.
        
    ],
    exports:[
        FontAwesomeModule
    ],
    providers: [
        fakeBackendProvider,
        MatIconRegistry,
        DemoCrudService,
        { provide: 'MbsNewsFeedUri', useValue: '/api/rss/newsfeed' }, 
        { provide: 'MbsMenuUri',    useValue: '/api/menu' },
        { provide: 'MbsHelp',       useValue: { uri: '/api/help' } },
        { provide: 'MbsThemeData',  useValue: { uri: '/api/theme',
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
    constructor(public iconRegistry: MatIconRegistry, 
                library: FaIconLibrary, faConfig: FaConfig,
                sanitizer: DomSanitizer ) 
    {
        library.addIconPacks(fas, far, fab);
        iconRegistry.registerFontClassAlias( 'fontawesome', 'fa' );
        iconRegistry.setDefaultFontSetClass( 'fa' )
        iconRegistry.addSvgIcon('thumbs-up', 
                     sanitizer.bypassSecurityTrustResourceUrl('assets/addwatch.svg'));
        //iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    }
}
