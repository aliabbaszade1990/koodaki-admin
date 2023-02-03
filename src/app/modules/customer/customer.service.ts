import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/modules/core/services/base.service';
import { ICustomer } from './dto/customer';

export class CustomerService extends BaseService<ICustomer> {
  constructor() {
    super('customer');
  }
}
