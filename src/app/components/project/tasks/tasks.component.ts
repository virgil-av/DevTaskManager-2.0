import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {Auth} from "../../../services/auth0.service";
import {ActivatedRoute} from "@angular/router";

declare let $:any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  anyErrors: Error;
  isLoading: boolean = false;

  selectedComment: string;
  selectedTask;
  projectId: string;
  tasks: any[] = [];
  anyError: Error;
  sortBy: string = '-date';
  rowsPerPage: number = 20;
  sortVariable; // used as toggle for table column sorting
  filterQuery = '' // used for the search


  vis: any;

  constructor(private db: DatabaseService, private auth: Auth, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe(id => {
          this.projectId = id;
          console.log(id)
        },
        error => this.anyError = error
      );
  }

  ngOnInit() {
    this.db.getTasks(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
      console.log(tasks)
    })

  }

  updateTasksTable($event) {
    this.tasks.push($event);

  }


  sort(type) {
    this.sortVariable = !this.sortVariable

    if (this.sortVariable) {
      this.sortBy = '-' + type;
    } else {
      this.sortBy = '+' + type;
    }
  }

   makeVisible(){
    this.vis = !this.vis
   }



}
