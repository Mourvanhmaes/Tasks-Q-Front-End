import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './layout/principal/principal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "admin", component: PrincipalComponent, children: [
    {path: "dashboard", component: DashboardComponent},
    {path: "users", component: },
    {path: "dashboard", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent}

  ]}
];