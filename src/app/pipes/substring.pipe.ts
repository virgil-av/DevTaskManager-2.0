import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class SubstringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length > args) {
      return value.substring(0, args) + '...';
    }
    return value;
  }

}
