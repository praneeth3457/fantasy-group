import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: unknown, field: string, order: string): unknown {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if(order == 'dec') {
        if (a[field] > b[field]) {
          return -1;
        } else if (a[field] < b[field]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }

}
