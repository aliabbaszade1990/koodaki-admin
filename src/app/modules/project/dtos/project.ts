import { ICustomer } from '../../customer/dto/customer';

export interface IProject {
  id: string;
  title: string;
  isClosed: boolean;
  location: string;
  filesAt: string;
  createAt: Date;
  startedAt: Date;
  endedAt: Date;
  customer: ICustomer;
}
