import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { ICustomer } from './dto/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService<ICustomer> {
  constructor() {
    super('customer');
  }
}
