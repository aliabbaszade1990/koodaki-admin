import { ListParams } from './list-params.dto';

export class ProjectListParams extends ListParams {
  customerId?: string;

  constructor(
    page: number,
    size: number,
    customerId?: string,
    search?: string
  ) {
    super(page, size);
    this.customerId = customerId;
    this.search = search;
  }
}
