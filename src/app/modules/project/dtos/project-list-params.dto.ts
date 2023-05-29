import { ListParams } from './list-params.dto';

export class ProjectListParams extends ListParams {
  customerId?: string;
  finalized?: boolean;

  constructor(
    size: number,
    page: number,
    search?: string,
    customerId?: string,
    finalized?: boolean
  ) {
    super(size, page, search);
    this.customerId = customerId;
    this.finalized = finalized;
  }
}
