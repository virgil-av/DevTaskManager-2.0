import {DashboardComponent} from "./dashboard/dashboard.component";
import {TasksComponent} from "./tasks/tasks.component";
import {TeamComponent} from "./team/team.component";
import {CategoriesComponent} from "./categories/categories.component";

export const PROJECT_ROUTES = [
  {path:'', component: DashboardComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'tasks', component: TasksComponent},
  {path:'team', component: TeamComponent},
  {path:'categories', component: CategoriesComponent}
];
