import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DatabaseService} from "../../../../../services/database.service";
import {Auth} from "../../../../../services/auth0.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-discussion',
  templateUrl: './task-discussion.component.html',
  styleUrls: ['./task-discussion.component.css']
})
export class TaskDiscussionComponent implements OnInit {

  addMessageForm: FormGroup;
  projectId: string;
  anyError: Error;
  @Input() taskId: string;

  constructor(private db: DatabaseService, private formBuilder: FormBuilder, private auth: Auth, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe(id => {
          this.projectId = id;
        },
        error => this.anyError = error
      );


    this.addMessageForm = this.formBuilder.group({
      "message": ['',Validators.required],
      "author": this.auth.loggedUserName(),
      "created": new Date(),
      "edited": false
    });
  }

  addMessage(){
    this.db.createNewTaskMessage(this.addMessageForm.value, this.projectId, this.taskId)
      .subscribe(response =>{
        console.log(response);

        this.addMessageForm.reset({
          "message": '',
          "author": this.auth.loggedUserName(),
          "created": new Date(),
          "edited": false
        })

      })


  }

}
