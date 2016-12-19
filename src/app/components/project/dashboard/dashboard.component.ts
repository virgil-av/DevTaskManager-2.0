import {Component, OnInit, OnDestroy} from '@angular/core';
import {ParentChildrenService} from "../../../services/parent-children.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{



  constructor(private pcService: ParentChildrenService) { }

  ngOnInit() {
  }


}
