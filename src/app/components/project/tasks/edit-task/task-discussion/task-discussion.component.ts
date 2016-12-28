import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DatabaseService} from "../../../../../services/database.service";
import {Auth} from "../../../../../services/auth0.service";
import * as _ from 'lodash';


@Component({
  selector: 'app-task-discussion',
  templateUrl: './task-discussion.component.html',
  styleUrls: ['./task-discussion.component.css']
})
export class TaskDiscussionComponent implements OnInit{

  addMessageForm: FormGroup;
  discussion: any[] = [];
  anyError: Error;
  @Input() projectId: string;
  @Input() task: any;



  constructor(private db: DatabaseService, private formBuilder: FormBuilder, private auth: Auth) { }

  ngOnInit() {
    this.addMessageForm = this.formBuilder.group({
      "id": this.db.generateUniqueId(),
      "message": ['',Validators.required],
      "author": this.auth.loggedUserName(),
      "created": new Date(),
      "edited": false
    });

  }


  addMessage(){
    this.db.createNewTaskMessage(this.addMessageForm.value, this.projectId, this.task.id)
      .subscribe(response =>{

        console.log(response)
        this.task.discussion.push(response);

        this.addMessageForm.reset({
          "id": this.db.generateUniqueId(),
          "message": '',
          "author": this.auth.loggedUserName(),
          "created": new Date(),
          "edited": false
        });

      },
      error => this.anyError = error
      );
  }

  deleteMessage(messageId){
    this.db.deleteMessage(this.projectId,this.task.id,messageId)
      .subscribe(response => {
        console.log(response);
        _.remove(this.task.discussion,{
          id: response.messageId
        })
      })

  }

}
