import { ListParams } from './list-params.dto';

export class ProjectListParams extends ListParams {
  customerId?: string;

  constructor(
    size: number,
    page: number,
    customerId?: string,
    search?: string
  ) {
    super(size, page);
    this.customerId = customerId;
    this.search = search;
  }
}
