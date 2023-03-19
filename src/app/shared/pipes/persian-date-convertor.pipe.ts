import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate',
})
export class PersianDateConvertor implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return new Date(value).toLocaleDateString('fa-IR');
  }
}
