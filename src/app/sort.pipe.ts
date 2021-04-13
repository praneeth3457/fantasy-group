import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: unknown, field1: string, field2: string, field3: string): unknown {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field1] > b[field1]) {
        return -1;
      } else if (a[field1] < b[field1]) {
        return 1;
      } else {
        if (a[field2] > b[field2]) {
          return -1;
        } else if (a[field2] < b[field2]) {
          return 1;
        } else {
          if (a[field3] < b[field3]) {
            return -1;
          } else if (a[field3] > b[field3]) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    });
    return array;
  }

}
