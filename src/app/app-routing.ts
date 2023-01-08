import { Routes } from '@angular/router';
// import { AuthGuard } from './core/_NGXS/authenticated.guard';
import { AuthGuard } from './core/services/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./modules/project/project.module').then((m) => m.ProjectModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'upload-file',
    loadChildren: () =>
      import('./modules/upload-file/upload-file.module').then(
        (m) => m.UploadFileModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
