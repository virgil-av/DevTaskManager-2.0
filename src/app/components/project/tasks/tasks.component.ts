import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {TaskSettings} from "../../../dependencies/task.settings";

import * as _ from 'lodash';
import {Auth} from "../../../services/auth0.service";
declare let $:any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  isLoading: boolean = true;
  taskSettings: any;
  selectedTask: any;
  displayState: string;
  projectId: string;
  projectTeam: any[] = [];
  projectCategories: any[] = [];
  tasks: any[];
  isTasksEmpty: boolean = false;
  anyError: Error;
  sortBy: string = '-date';
  rowsPerPage: number = 15;
  sortVariable; // used as toggle for table column sorting
  filterQuery = ''; // used for the search



  constructor(private db: DatabaseService, private activatedRoute: ActivatedRoute, private auth: Auth) {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe(id => this.projectId = id, error => this.anyError = error);

  }

  ngOnInit() {
    this.taskSettings = TaskSettings;

    this.db.getProject(this.projectId).subscribe(project => {
        this.projectTeam = project.team;
        this.projectCategories = project.categories;
        this.tasks = project.tasks;
        this.isLoading = false;

        this.isTasksEmpty = _.isEmpty(project.tasks);
      },
      error => this.anyError = error
    );

  }

  updateTasksTable($event) {
    this.tasks.push($event);
    this.isTasksEmpty = false;
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
        this.isTasksEmpty = _.isEmpty(this.tasks);
        $('#deleteTask').modal('hide');
    },
    error => this.anyError = error
    );
  }


}
