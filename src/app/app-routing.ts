import { Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';
// import { AuthGuard } from './core/_NGXS/authenticated.guard';
import { DashboardLayoutComponent } from './modules/layout/dashboard-layout/dashboard-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'customer/list',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
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
          import('./modules/project/project.module').then(
            (m) => m.ProjectModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
