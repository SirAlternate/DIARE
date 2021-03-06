import { BrowserModule }                      from '@angular/platform-browser';
import { NgModule }                           from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }                         from '@angular/http';

import { AppComponent }                       from './app.component';
import { AppRoutingModule }                   from './app-routing.module';
import { AppConfig }                          from './app.config';

import { HomepageComponent }                  from './homepage/homepage.component';
import { LoginComponent }                     from './homepage/login/login.component';
import { RegisterComponent }                  from './register/register.component';
import { AboutComponent }                     from './about/about.component';
import { SettingsComponent } 			            from './settings/settings.component';

import { JournalsPageComponent }  		from './journals-page/journals-page.component';
import { AddJournalComponent }    		from './journals-page/add-journal/add-journal.component';
import { UserJournalComponent }   		from './journals-page/user-journal/user-journal.component';
import { PopupComponent } 						from './journals-page/popup/popup.component';
import { JournalPagesComponent } 			from './journals-page/user-journal/journal-pages/journal-pages.component';
import { PageComponent } 							from './journals-page/user-journal/journal-pages/page/page.component';
import { PageDisplayComponent } 			from './journals-page/page-display/page-display.component';
import { AddBulletComponent } 				from './journals-page/page-display/add-bullet/add-bullet.component';
import { PageBulletComponent } 				from './journals-page/page-display/page-bullet/page-bullet.component';
import { BulletFocusDirective } from './journals-page/page-display/bullet-focus.directive';
import { SearchComponent } from './search/search.component';
import { SearchBulletComponent } from './search/search-bullet/search-bullet.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    SettingsComponent,
    JournalsPageComponent,
    AddJournalComponent,
    UserJournalComponent,
		PopupComponent,
    JournalPagesComponent,
    PageComponent,
    PageDisplayComponent,
		AddBulletComponent,
    PageBulletComponent,
    BulletFocusDirective,
    SearchComponent,
    SearchBulletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
