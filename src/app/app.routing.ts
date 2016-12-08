import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {ProjectsPageComponent} from "./components/projects-page/projects-page.component";





const routes: Routes = [
  {
    path: '', component: LoginPageComponent
  },
  {
    path: 'projects', component: ProjectsPageComponent
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
