import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ParentChildrenService {

  // Observable string sources
  private emmitProjectsList = new Subject<string[]>();


  // Observable string streams
  projectList$ = this.emmitProjectsList.asObservable();


  // Service message commands
  sendProjectsList(list: string[]) {
    this.emmitProjectsList.next(list);
  }


}
