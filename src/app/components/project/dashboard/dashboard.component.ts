import {Component, OnInit} from '@angular/core';
import {ParentChildrenService} from "../../../services/parent-children.service";
import {DatabaseService} from "../../../services/database.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  projectSummary: any;
  anyError: Error;


  constructor(private pcService: ParentChildrenService,
              private activatedRoute: ActivatedRoute,
              private db: DatabaseService) { }


  ngOnInit() {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.db.getProjectSummary(id).subscribe(response =>{
            this.projectSummary = response;
            this.pcService.sendDashboardValues(response);
          },
          error => this.anyError = error
        )
      });
  }


}
