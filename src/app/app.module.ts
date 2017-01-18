import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


import { AppComponent } from './app.component';
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
import { TableSortingPipe } from './pipes/table-sorting.pipe';
import {Ng2PaginationModule} from 'ng2-pagination';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { AddTaskComponent } from './components/project/tasks/add-task/add-task.component';
import { NameInitialsPipe } from './pipes/name-initials.pipe';
import { EditTaskComponent } from './components/project/tasks/edit-task/edit-task.component';
import { TaskDiscussionComponent } from './components/project/tasks/edit-task/task-discussion/task-discussion.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { TeamComponent } from './components/project/team/team.component';
import { CategoriesComponent } from './components/project/categories/categories.component';
import { ActivityPageComponent } from './components/activity-page/activity-page.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { TaskCommentComponent } from './components/project/tasks/task-comment/task-comment.component';
import { FilterToolbarComponent } from './components/project/tasks/filter-toolbar/filter-toolbar.component';
import { FilterPipe } from './pipes/filter.pipe';
import {TaskTestersComponent} from "./components/project/tasks/edit-task/add-testers/add-testers.component";
import { TestingDetailsComponent } from './components/project/tasks/edit-task/testing-details/testing-details.component';


export function AuthHttpFactory (http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

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
    TeamComponent,
    CategoriesComponent,
    ActivityPageComponent,
    MarkdownPipe,
    TaskCommentComponent,
    FilterToolbarComponent,
    FilterPipe,
    TestingDetailsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting,
    Ng2PaginationModule
  ],
  providers: [
    {
    provide: AuthHttp,
    deps: [Http, RequestOptions],
    useFactory: AuthHttpFactory
    },
    Auth,
    DatabaseService,
    ParentChildrenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
