export class PagingResponse<T> {
  total: number;
  hasNext: boolean;
  items: T[];
}
