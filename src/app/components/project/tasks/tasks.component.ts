import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {ActivatedRoute} from "@angular/router";

import * as _ from 'lodash';
import {Auth} from "../../../services/auth0.service";
declare let $:any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  isLoading: boolean = false;
  selectedTask: any;
  displayState: string;
  projectId: string;
  projectTeam: any[] = [];
  projectCategories: any[] = [];
  tasks: any[] = [];
  contactsList: any[] = [];
  anyError: Error;
  sortBy: string = '-date';
  rowsPerPage: number = 15;
  sortVariable; // used as toggle for table column sorting
  filterQuery = '' // used for the search



  constructor(private db: DatabaseService, private activatedRoute: ActivatedRoute, private auth: Auth) {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe(id => {
          this.projectId = id;
          this.db.getProjectTeam(id).subscribe(team => this.projectTeam = team, error => this.anyError = error);
          this.db.getProjectCategories(id).subscribe(categories => this.projectCategories = categories, error => this.anyError = error);
        },
        error => this.anyError = error
      );

    this.auth.getListOfUsers().subscribe(contacts => {
        this.contactsList = contacts;
        console.log("auth contacts request")
      }, error => this.anyError = error
    )

  }

  ngOnInit() {
    this.db.getTasks(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
    })

  }

  updateTasksTable($event) {
    this.tasks.push($event);
  }


  sort(type) {
    this.sortVariable = !this.sortVariable;

    if (this.sortVariable) {
      this.sortBy = '-' + type;
    } else {
      this.sortBy = '+' + type;
    }
  }

  openTask(task: any, selectedState: string){
    this.selectedTask = task;
    this.displayState = selectedState;
  }

  updateTasks(value){
    let task = _.find(this.tasks,{
      id: this.selectedTask.id
    });

    _.merge(task, value);
  }

  deleteTask(id){
    this.isLoading = true;
    this.db.deleteTask(this.projectId, id).subscribe(() => {
      _.remove(this.tasks,{
        id: id
      });
        this.isLoading = false;
        $('#deleteTask').modal('hide');
    },
    error => this.anyError = error
    );
  }


}
