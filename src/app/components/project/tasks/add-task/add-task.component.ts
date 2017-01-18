import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../../../services/database.service";
import {Auth} from "../../../../services/auth0.service";
import {TaskSettings} from "../../../../dependencies/task.settings";

declare let $:any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  isLoading: boolean = false;
  addTaskForm: FormGroup;
  loggedUserName: string;
  @Input() userList: any[];
  @Input() categoryList: any[];
  taskSettings:any;
  @Input() projectId: string;
  @Output() updateTasks: EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private db: DatabaseService, private auth: Auth) { }

  ngOnInit() {

    this.taskSettings = TaskSettings;

    this.loggedUserName = this.auth.loggedUserName();

    this.addTaskForm = this.formBuilder.group({
      'id': this.db.generateUniqueId(),
      'title': ['', [Validators.required, Validators.minLength(5)]],
      'status': ['New', [Validators.required]],
      'priority': ['Normal', [Validators.required]],
      'assignee': [''],
      'category': [''],
      'comment': [''],
      'date': [new Date()],
      'author': [this.loggedUserName], // auth0 get author of task
    });

  }

  resetForm() {
    // resets the form after submission
    this.addTaskForm.reset({
      'id': this.db.generateUniqueId(),
      'status': 'New',
      'priority': 'Normal',
      'assignee': '',
      'category': '',
      'comment': '',
      'date': new Date(),
      'author': this.loggedUserName,
    });
  }

  createTask() {
    this.isLoading = true;
    this.db.createNewTask(this.addTaskForm.value,this.projectId)
      .subscribe( response => {
      this.updateTasks.emit(response);
      this.isLoading = false;
      this.resetForm();

      $('#addTask').modal('hide'); //closes modal window
    })
  }

}
