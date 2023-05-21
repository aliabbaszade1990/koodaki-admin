import { ICustomer } from '../../customer/dto/customer';

export interface IProject {
  id: string;
  title: string;
  isClosed: boolean;
  location: string;
  startedAt: Date;
  endedAt: Date;
  totalFiles: number;
  selectedImagesCount?: number;
  defaultImage?: string;
  finalized: boolean;
  customer: ICustomer;
}
