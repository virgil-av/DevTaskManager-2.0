import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {DatabaseService} from "../../../../services/database.service";
import {taskSettings} from "../../../../dependencies/add-task.settings";
import * as _ from "lodash";

declare let $: any;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnChanges {

  editTaskForm: FormGroup;
  taskSettings: any;
  @Input() userList: any[];
  @Input() categoryList: any[];
  @Input() contactsList: any[];
  isLoading: boolean = false;
  @Input() projectId: string;
  @Input() selectedTask: any;
  @Output() updateTasks: EventEmitter<any> = new EventEmitter;

  constructor(private db: DatabaseService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.taskSettings = taskSettings;
  }

  ngOnChanges() {
    if (this.selectedTask) {
      this.editTaskForm = this.formBuilder.group({
        'title': [this.selectedTask.title, [Validators.required, Validators.minLength(5)]],
        'status': this.selectedTask.status,
        'priority': this.selectedTask.priority,
        'assignee': this.selectedTask.assignee,
        'category': this.selectedTask.category,
        'comment': this.selectedTask.comment,
      });

      if (_.has(this.selectedTask, 'discussion')) {
        return;
      } else {
        this.selectedTask['discussion'] = [];
      }
    }
  }


  editTask() {
    this.isLoading = true;
    this.db.updateEditedTask(this.editTaskForm.value, this.projectId, this.selectedTask.id)
      .subscribe(() => {
        this.updateTasks.emit(this.editTaskForm.value);
        this.isLoading = false;
        $('#editTask').modal('hide');
      })

  }


}
