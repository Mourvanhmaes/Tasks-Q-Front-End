import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';

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
    path: 'admin',
    component: PrincipalComponent,
    children:[
        {
          path: 'tasks',
          component: TasksComponent
        },
        {
          path: 'users',
          component: UsersComponent
        },
    ]
  }
];