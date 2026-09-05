import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './layout/principal/principal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserlistComponent } from './pages/users/userlist/userlist.component';
import { TasklistComponent } from './pages/tasks/tasklist/tasklist.component';
import { TaskdetailsComponent } from './components/tasks/taskdetails/taskdetails.component'

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},

  {path: "admin", component: PrincipalComponent, children: [
    {path: "dashboard", component: DashboardComponent},
    {path: "users", component: UserlistComponent},
    {path: "tasks", component: TasklistComponent},
    {path: "tasks/:id", component: TaskdetailsComponent},

  ]}
];