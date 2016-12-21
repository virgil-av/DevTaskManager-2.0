import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {DatabaseService} from "../../../../services/database.service";
import {taskSettings} from "../../../../dependencies/add-task.settings";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnChanges {

  editTaskForm: FormGroup;
  taskSettings:any;
  userList: any[] = [];
  categoryList: any[] = [];
  anyError: Error;
  @Input() selectedTask: any;

  constructor(private db: DatabaseService, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.taskSettings = taskSettings;
    this.db.getCategory().subscribe(category => this.categoryList = category, error => this.anyError = error);
    this.db.getUsers().subscribe(user => this.userList = user, error => this.anyError = error);
  }

  ngOnChanges() {

    if(this.selectedTask){
      this.editTaskForm = this.formBuilder.group({
        'id': this.selectedTask.id,
        'title': [this.selectedTask.title, [Validators.required, Validators.minLength(5)]],
        'status': [this.selectedTask.status, [Validators.required]],
        'priority': [this.selectedTask.priority, [Validators.required]],
        'assignee': [this.selectedTask.assignee],
        'category': [this.selectedTask.category],
        'comment': [this.selectedTask.comment],
        'date': this.selectedTask.date,
        'author': this.selectedTask.author, // auth0 get author of task
        'discussion': this.selectedTask.discussion,
        'testers': this.selectedTask.testers
      });
    }
  }


  editTask(){

  }



}
