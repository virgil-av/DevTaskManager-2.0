import {Component, OnInit, OnDestroy} from '@angular/core';
import {Auth} from "../../services/auth0.service";
import {ParentChildrenService} from "../../services/parent-children.service";
import { Subscription }   from 'rxjs/Subscription';
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  listOfProjects: any[];
  anyErrors: Error;

  constructor(private auth: Auth, private pcService: ParentChildrenService, private db: DatabaseService) {
    this.db.getAllProjects().subscribe(response => {
        this.listOfProjects = response;

        this.subscription = pcService.projectList$.subscribe(response => {
            this.listOfProjects = response;
          },
          error => this.anyErrors = error
        )
      },
      error => this.anyErrors = error
    )

  }

  ngOnInit() {

  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }


}
