import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {ProjectsPageComponent} from "./components/projects-page/projects-page.component";
import {ProjectComponent} from "./components/project/project.component";
import {PROJECT_ROUTES} from "./components/project/project.routes";
import {ContactsPageComponent} from "./components/contacts-page/contacts-page.component";
import {ActivityPageComponent} from "./components/activity-page/activity-page.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";
import {NotesPageComponent} from "./components/notes-page/notes-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";





const routes: Routes = [
  {
    path: '', component: LoginPageComponent
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'projects', component: ProjectsPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'project', component: ProjectComponent, canActivate:[AuthGuard]
  },
  {
    path: 'project/:id', component: ProjectComponent, children: PROJECT_ROUTES, canActivate:[AuthGuard]
  },
  {
    path: 'contacts', component: ContactsPageComponent, canActivate:[AdminGuard]
  },
  {
    path: 'activity', component: ActivityPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'profile', component: ProfilePageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'notes', component: NotesPageComponent, canActivate:[AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRouting { }
