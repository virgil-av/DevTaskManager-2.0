import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {Auth} from "../../../services/auth0.service";
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  projectId: string;
  teamList: any[];
  contactsList: any[];
  anyError: Error;
  formAddToTeam: FormGroup;
  isLoading: boolean;

  constructor(private db: DatabaseService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private auth: Auth) {

    this.formAddToTeam = formBuilder.group({
      "name": ['', Validators.required,this.isDuplicateMember.bind(this)],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.projectId = id;

        this.db.getProjectTeam(id).subscribe(response =>{
            this.teamList = response;
          },
          error => this.anyError = error
        )
      });

    this.getContacts();

  }

  getContacts(){
    this.auth.getListOfUsers().subscribe(contacts => {
        this.contactsList = contacts;
      console.log(contacts)
      }, error => this.anyError = error
    )
  }

  isDuplicateMember(control: FormControl) {
    let promise = new Promise<any>(
      (resolve, reject) => {
        let contact = _.find(this.teamList,{name: control.value});

        if(contact){
          resolve({'duplicate': true});
        }else{
          resolve(null);
        }
      }
    );
    return promise;
  }


  addToTeam(){

    this.db.addContactToTeam(this.formAddToTeam.value,this.projectId)
      .subscribe(response =>{
          this.teamList.push(response);
          this.formAddToTeam.reset({"name":''});
      },
        error => this.anyError = error
      )
  }

  removeFromTeam(memberName: string){
    this.db.deleteTeamMember(this.projectId,memberName)
      .subscribe(() =>{
          _.remove(this.teamList, {
            "name": memberName
          });
        },
        error => this.anyError = error
      )
  }

}
