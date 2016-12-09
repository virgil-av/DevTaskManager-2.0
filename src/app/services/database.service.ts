import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {dbSettings} from '../dependencies/database.config';
const uniqid: any = require('uniqid');

import 'rxjs/add/operator/map'


@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  createNewProject(body: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(dbSettings.dbUrl + dbSettings.dbProjects,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }

  addProjectToList(body: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(dbSettings.dbUrl + dbSettings.dbList,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }


  getAllProjects(){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbList)
      .map(response => response.json());
  }

  getSingleProject(id: string){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbProjects + "/" + id)
      .map(response => response.json());
  }


  generateUniqueId(){
    return uniqid() + 'av' + (Math.floor((Math.random() * 10000000) + 1)).toString(16);
  }





}
