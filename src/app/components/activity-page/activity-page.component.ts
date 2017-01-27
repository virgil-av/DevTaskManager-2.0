import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.css']
})
export class ActivityPageComponent implements OnInit {

  activityList: any[] = [];

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getActivity().subscribe(activity => {

      this.activityList = activity;
    })
  }

}
