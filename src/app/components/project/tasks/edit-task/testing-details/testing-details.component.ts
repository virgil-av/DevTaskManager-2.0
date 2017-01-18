import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../../../../services/database.service";
import * as _ from 'lodash';
import {Auth} from "../../../../../services/auth0.service";

@Component({
  selector: 'app-testing-details',
  templateUrl: './testing-details.component.html',
  styleUrls: ['./testing-details.component.css']
})
export class TestingDetailsComponent implements OnInit {

  @Input() selectedTask: any;
  @Input() userList: any[];
  @Input() projectId: string;
  isToggled: boolean = false;
  isExpanded: string = 'default';
  formTestingProgress: FormGroup;
  anyError: Error;

  constructor(private db: DatabaseService, private formBuilder: FormBuilder, private auth: Auth) {
    this.formTestingProgress = formBuilder.group({
      "progress": ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  toggle(selectedPanel: string){
    this.isToggled = !this.isToggled;
    this.isExpanded = selectedPanel;
  }


  modifyProgress(progressValue: string, testerId: string){

    let body = {"progress": progressValue};

    this.db.updateTestingProgress(body,this.projectId,this.selectedTask.id,testerId)
      .subscribe(response =>{
          let tester = _.find(this.selectedTask.testers,{
            "id": testerId
          });
          _.merge(tester,response);
        },
        error => this.anyError = error
      );

  }

}
