import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterstring: string, propname: string): any {
    if (value.length === 0 || filterstring == '') return value;
    const resultArray = [];
    for (const item of value) {
      if (item[propname] == filterstring) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
