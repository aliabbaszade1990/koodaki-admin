import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoute } from './customer.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerComponent } from './customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerRoute),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [CustomerComponent, CustomerFormComponent],
  providers: [],
})
export class CustomerModule {}
