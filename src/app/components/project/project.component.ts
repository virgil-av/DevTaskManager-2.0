import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router, RouterState} from "@angular/router";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import {DatabaseService} from "../../services/database.service";
import {ParentChildrenService} from "../../services/parent-children.service";

import {Observable} from "rxjs";



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css','./sidemenu.css']
})
export class ProjectComponent implements OnInit {

  anyError: Error;
  sideMenuToggle: any;
  selectedProject: any;






  constructor(private db: DatabaseService, private activatedRoute: ActivatedRoute, private pcService: ParentChildrenService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.db.getSingleProject(id).subscribe(response =>{
            this.selectedProject = response;

            this.pcService.sendProject(this.selectedProject);
          },
          error => this.anyError = error
        )
      });

  }



  toggleSideMenu(){
    this.sideMenuToggle = !this.sideMenuToggle
  }


}
