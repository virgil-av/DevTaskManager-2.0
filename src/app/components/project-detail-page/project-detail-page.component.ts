import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map'

declare let $:any;

@Component({
  selector: 'app-project-detail-page',
  templateUrl: './project-detail-page.component.html',
  styleUrls: ['./project-detail-page.component.css','./sidemenu.css']
})
export class ProjectDetailPageComponent implements OnInit {

  anyError: Error;
  sideMenuToggle: any;
  selectedProject: any;

  constructor(private db: DatabaseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .map(params => params['id'])
      .subscribe((id) => {
      this.db.getSingleProject(id).subscribe(response =>{
        this.selectedProject = response;
        console.log(response);
      },
      error => this.anyError = error
      )
      });

  }

  toggleSideMenu(){
    this.sideMenuToggle = !this.sideMenuToggle
  }

}
