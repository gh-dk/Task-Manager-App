import { Routes } from '@angular/router';
import { LoginComponent } from '../app/views/login/login.component';
import { RegisterComponent } from '../app/views/register/register.component';
import { DashboardComponent } from '../app/views/dashboard/dashboard.component';
import { authGuard } from '../app/guards/auth.guard';

const router: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        // component: MainComponent,
        loadChildren: () =>
          import('../app/components/main/main.module').then(
            (m) => m.MainModule
          ),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('../app/components/manage-task/manage-task.module').then(
            (m) => m.ManageTaskModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../app/components/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

export default router;
