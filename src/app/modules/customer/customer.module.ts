import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProjectToCustomerComponent } from './add-project-to-customer/add-project-to-customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoute } from './customer.routing';
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerRoute),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    CustomerFormComponent,
    CustomerListComponent,
    AddProjectToCustomerComponent,
  ],
  providers: [CustomerService],
})
export class CustomerModule {}
