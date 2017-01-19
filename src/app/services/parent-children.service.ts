import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ParentChildrenService {

  // Sends projects list to header menu drop down.
  // Observable string sources
  private emmitProjectsList = new Subject<string[]>(); // projects -> header

  // Observable string streams
  projectList$ = this.emmitProjectsList.asObservable(); // to subscribe in header

  sendProjectsList(list: string[]) {
    // this will send the data from projects to the observable, called from source
    this.emmitProjectsList.next(list);
  }


  // Triggers a method from parent to child, can be reused.
  // Observable string sources
  private componentMethodCallSource = new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }


  // send values from project component to child routes
  // Observable string sources
  private emmitValuesFromDashboard = new Subject<any>();

  // Observable string streams
  getValuesFromDashboard$ = this.emmitValuesFromDashboard.asObservable();

  // Service message commands
  sendDashboardValues(value: string[]) {
    this.emmitValuesFromDashboard.next(value);
  }





}
