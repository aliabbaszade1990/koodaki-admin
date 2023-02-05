import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';

export const CustomerRoute: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
];
