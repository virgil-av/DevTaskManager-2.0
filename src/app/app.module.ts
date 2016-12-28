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
import { SubstringPipe } from './pipes/substring.pipe';
import { ProjectComponent } from './components/project/project.component';
import { DashboardComponent } from './components/project/dashboard/dashboard.component';
import { TasksComponent } from './components/project/tasks/tasks.component';
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import { TableSortingPipe } from './pipes/table-sorting.pipe';
import {Ng2PaginationModule} from 'ng2-pagination';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { AddTaskComponent } from './components/project/tasks/add-task/add-task.component';
import { NameInitialsPipe } from './pipes/name-initials.pipe';
import { EditTaskComponent } from './components/project/tasks/edit-task/edit-task.component';
import { TaskDiscussionComponent } from './components/project/tasks/edit-task/task-discussion/task-discussion.component';
import { TaskTestersComponent } from './components/project/tasks/edit-task/task-testers/task-testers.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProjectsPageComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    CapitalizePipe,
    SubstringPipe,
    ProjectComponent,
    DashboardComponent,
    TasksComponent,
    TableSortingPipe,
    TimeAgoPipe,
    AddTaskComponent,
    NameInitialsPipe,
    EditTaskComponent,
    TaskDiscussionComponent,
    TaskTestersComponent,
    ContactsPageComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting,
    DragulaModule,
    Ng2PaginationModule
  ],
  providers: [AUTH_PROVIDERS, Auth, DatabaseService, ParentChildrenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
