import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-tasks-summary',
  templateUrl: './tasks-summary.component.html',
  styleUrls: ['./tasks-summary.component.css']
})
export class TasksSummaryComponent implements OnInit {

  @Input() projectSummary: any;

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

  }

  calculatePercent(){
    let calculate = Math.floor(+this.projectSummary.totalCompleted / +this.projectSummary.totalTasks *100);
    if(isNaN(calculate)){
      return '0%'
    }return calculate + '%'

  }

  navigateTo(){
    this.router.navigate(['../tasks'], {relativeTo: this.route})
  }

}
