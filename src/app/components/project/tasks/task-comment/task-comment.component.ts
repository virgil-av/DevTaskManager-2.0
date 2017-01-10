import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.css']
})
export class TaskCommentComponent implements OnInit {

  @Input() selectedTask: string;

  constructor() { }

  ngOnInit() {
  }

}
