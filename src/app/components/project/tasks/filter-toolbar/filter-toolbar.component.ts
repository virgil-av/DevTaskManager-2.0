import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {TaskSettings} from "../../../../dependencies/task.settings";

@Component({
  selector: 'app-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.css']
})
export class FilterToolbarComponent implements OnInit {

  constructor() {}

  taskSettings: any;
  showReset: boolean = false;
  @Input() rowsDefault: number;
  @Input() userList: any[];
  @Input() categoryList: any[];
  @Output() rowsPerPage: EventEmitter<any> = new EventEmitter;
  @Output() searchTerm: EventEmitter<any> = new EventEmitter;

  ngOnInit() {
    this.taskSettings = TaskSettings;
  }

  emitRows() {
    this.rowsPerPage.emit(this.rowsDefault);
  }

  emitSearch(value) {
    this.searchTerm.emit(value);

    if(value !== ""){
      this.showReset = true;
    }else if(value === ""){
      this.showReset = false;
    }

  }

  resetForm(form) {
    this.searchTerm.emit('');
    form.reset({
      category: '',
      status: '',
      user: '',
      priority: ''
    });

    this.showReset = false;
  }


}
