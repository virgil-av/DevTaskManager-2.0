import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {dbSettings} from '../dependencies/database.config';
import 'rxjs/add/operator/map';

const uniqid: any = require('uniqid');


@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  createNewProject(body: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(dbSettings.dbUrl + dbSettings.dbProjects,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }


  createNewTask(body: any, id: string){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(dbSettings.dbUrl + dbSettings.dbProjects + '/' + id + '/tasks',JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }

  createNewTaskMessage(body: any, projectId: string, taskId: string ){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.patch(dbSettings.dbUrl + dbSettings.dbProjects + '/' + projectId + '/tasks/' + taskId + '/discussion',JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }

  updateEditedTask(body: any, projectId: string, taskId: string){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.patch(dbSettings.dbUrl + dbSettings.dbProjects + '/' + projectId + '/tasks/' + taskId,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }

  createNewContact(body: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(dbSettings.dbUrl + dbSettings.dbContacts,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }



  getAllProjects(){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbList)
      .map(response => response.json());
  }

  getProjectSummary(projectId: string){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbList + "/" + projectId)
      .map(response => response.json());
  }


  getCategory(){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbCategory)
      .map(response => response.json());
  }

  getUsers(){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbUsers)
      .map(response => response.json());
  }

  getTasks(projectId: string){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbProjects + "/" + projectId + '/tasks')
      .map(response => response.json());
  }

  getContacts(){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbContacts)
      .map(response => response.json());
  }

  getContactByEmail(email: string){
    return this.http.get(dbSettings.dbUrl + dbSettings.dbContacts + '/' + email)
      .map(response => response.json());
  }

  deleteProject(projectId: string){
    return this.http.delete(dbSettings.dbUrl + dbSettings.dbProjects + "/" + projectId)
      .map(response => response.json());
  }

  deleteTask(projectId: string, taskId: string){
    return this.http.delete(dbSettings.dbUrl + dbSettings.dbProjects + "/" + projectId + '/tasks/' + taskId)
      .map(response => response.json());
  }

  deleteMessage(projectId: string, taskId: string, messageId: string){
    return this.http.delete(dbSettings.dbUrl + dbSettings.dbProjects + "/" + projectId + '/tasks/' + taskId + '/discussion/' + messageId)
      .map(response => response.json());
  }



  generateUniqueId(){
    return uniqid() + 'av' + (Math.floor((Math.random() * 10000000) + 1)).toString(16);
  }





}
