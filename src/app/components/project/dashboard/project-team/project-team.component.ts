import {Component, OnInit, Input} from '@angular/core';
import {Auth} from "../../../../services/auth0.service";
import * as _ from 'lodash';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {
  @Input() projectSummary: any;
  contactsList: any[];
  anyError: Error;

  constructor(private auth: Auth, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.getListOfUsers().subscribe(contacts => {
        this.contactsList = contacts;
        console.log(contacts)
      }, error => this.anyError = error
    )
  }

  getProfilePic(userName: string){
    let contact =  _.find(this.contactsList, { user_metadata: {name: userName} });
    return contact.user_metadata.user_avatar;
  }

  navigateTo(){
    this.router.navigate(['../team'], {relativeTo: this.route})
  }

}
