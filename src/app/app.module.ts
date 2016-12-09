import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AUTH_PROVIDERS} from "angular2-jwt";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import {AppRouting} from "./app.routing";
import { HeaderComponent } from './components/header/header.component';
import {Auth} from "./services/auth0.service";
import {DatabaseService} from "./services/database.service";
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {ParentChildrenService} from "./services/parent-children.service";
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ProjectDetailPageComponent } from './components/project-detail-page/project-detail-page.component';
import { SubstringPipe } from './pipes/substring.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProjectsPageComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    CapitalizePipe,
    ProjectDetailPageComponent,
    SubstringPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [AUTH_PROVIDERS, Auth, DatabaseService, ParentChildrenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
