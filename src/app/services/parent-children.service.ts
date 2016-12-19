import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ParentChildrenService {

  // Observable string sources
  private emmitProjectsList = new Subject<string[]>(); // projects -> header
  private emmitProject = new Subject<string>(); // project -> subcomponents



  // Observable string streams
  projectList$ = this.emmitProjectsList.asObservable(); // to subscribe in header
  projectInfo$ = this.emmitProject.asObservable();// to subscribe in project subcomponents



  // Service message commands
  sendProjectsList(list: string[]) {
    // this will send the data from projects to the observable, called from source
    this.emmitProjectsList.next(list);
  }

  sendProject(project: string){
    // this will send the data from project to the observable, called from source
    this.emmitProject.next(project);
  }




}
