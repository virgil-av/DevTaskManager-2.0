import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials'
})
export class NameInitialsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value
        .split(' ')
        .map(function(word) {
          return word[0].toUpperCase();
        })
        .join('');
    }
    return value;
  }

}
