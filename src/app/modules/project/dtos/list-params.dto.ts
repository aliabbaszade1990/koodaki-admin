export class ListParams {
  page: number;
  size: number;
  search?: string;

  constructor(size: number = 10, page: number = 0, search: string = '') {
    this.size = size;
    this.page = page;
    this.search = search;
  }

  static stringify(params?: ListParams): string {
    if (!Boolean(params)) {
      return '';
    }

    const paramsArray: string[] = [];
    Object.entries(params as ListParams).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.map((v) => {
          paramsArray.push(`${key}=${v}`);
        });
      } else if (value !== null && value !== undefined && value !== '') {
        paramsArray.push(`${key}=${value}`);
      }
    });
    return (paramsArray.length ? '?' : '') + paramsArray.join('&');
  }
}
