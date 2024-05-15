import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'appname/:appname',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/appname/default',
    pathMatch: 'full',
  },
];
