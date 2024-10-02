import { Routes } from '@angular/router';
import { LoginComponent } from '../app/views/login/login.component';
import { RegisterComponent } from '../app/views/register/register.component';
import { DashboardComponent } from '../app/views/dashboard/dashboard.component';
import { MainComponent } from '../app/components/main/main.component';
import { ManageTaskComponent } from '../app/components/manage-task/manage-task.component';
import { authGuard } from '../app/guards/auth.guard';

const router: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    children: [{
      path: '',
      component: MainComponent
    }, {
      path: 'task',
      component: ManageTaskComponent
    }]
  },
];

export default router;
