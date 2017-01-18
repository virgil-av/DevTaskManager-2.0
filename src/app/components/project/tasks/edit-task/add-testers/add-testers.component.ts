import {Component, OnInit, Input} from '@angular/core';
import {DatabaseService} from "../../../../../services/database.service";
import {Validators, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'app-task-testers',
  templateUrl: './add-testers.component.html',
  styleUrls: ['./add-testers.component.css']
})
export class TaskTestersComponent implements OnInit {

  @Input() selectedTask: any;
  @Input() userList: any[];
  @Input() projectId: string;
  formAddTester: FormGroup;
  anyError: Error;

  constructor(private db: DatabaseService, private formBuilder: FormBuilder) {

    this.formAddTester = formBuilder.group({
      "name": ['', Validators.required,this.isDuplicateMember.bind(this)],
      "id": [this.db.generateUniqueId()],
      "progress": ['0']
    });

  }

  ngOnInit() {

  }


  isDuplicateMember(control: FormControl) {
    let promise = new Promise<any>(
      (resolve, reject) => {
        let contact = _.find(this.selectedTask.testers,{name: control.value});

        if(contact){
          resolve({'duplicate': true});
        }else{
          resolve(null);
        }
      }
    );
    return promise;
  }


  addToTesters(){
    this.selectedTask.testers = this.selectedTask.testers || [];
    this.db.addUserToTaskTesters(this.formAddTester.value,this.projectId,this.selectedTask.id)
      .subscribe(response =>{
          this.selectedTask.testers.push(response);
          this.formAddTester.reset({"name":'', "id": this.db.generateUniqueId(), "progress":'0'});
        },
        error => this.anyError = error
      );

  }

  removeTester(testerId: string){
    this.db.deleteTester(this.projectId,this.selectedTask.id, testerId)
      .subscribe(() =>{
          _.remove(this.selectedTask.testers, {
            "id": testerId
          });
        },
        error => this.anyError = error
      )
  }

}
