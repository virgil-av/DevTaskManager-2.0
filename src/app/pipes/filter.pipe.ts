import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args == '') { return value; }
    let query = args.toLowerCase();
    return value.filter(task =>
      task.title.toLowerCase().indexOf(query) > -1 ||
      task.status.toLowerCase().indexOf(query) > -1 ||
      task.priority.toLowerCase().indexOf(query) > -1 ||
      task.assignee.toLowerCase().indexOf(query) > -1 ||
      task.category.toLowerCase().indexOf(query) > -1 ||
      task.author.toLowerCase().indexOf(query) > -1

    );

  }

}
