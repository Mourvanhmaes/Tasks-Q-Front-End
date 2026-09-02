import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  }
];