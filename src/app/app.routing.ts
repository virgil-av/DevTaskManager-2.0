import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {ProjectsPageComponent} from "./components/projects-page/projects-page.component";
import {ProjectComponent} from "./components/project/project.component";
import {PROJECT_ROUTES} from "./components/project/project.routes";
import {ContactsPageComponent} from "./components/contacts-page/contacts-page.component";
import {ActivityPageComponent} from "./components/activity-page/activity-page.component";





const routes: Routes = [
  {
    path: '', component: LoginPageComponent
  },
  {
    path: 'projects', component: ProjectsPageComponent
  },
  {
    path: 'project', component: ProjectComponent
  },
  {
    path: 'project/:id', component: ProjectComponent, children: PROJECT_ROUTES
  },
  {
    path: 'contacts', component: ContactsPageComponent
  },
  {
    path: 'activity', component: ActivityPageComponent
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
