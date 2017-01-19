import {Component, OnInit, Input} from '@angular/core';
import {DatabaseService} from "../../../../services/database.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

declare let $:any;

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  formEditProject:FormGroup;
  @Input() projectSummary: any;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private db: DatabaseService ) {

        this.formEditProject = formBuilder.group({
          // values will be populated via ngModel in html
          "projectName": ['',[Validators.required,Validators.maxLength(40)]],
          "description": ['']
        });

  }

  ngOnInit() {

  }

  editProject(){
    this.isLoading = true;
    console.log(this.formEditProject.value)

    this.db.updateProject(this.formEditProject.value,this.projectSummary.id)
      .subscribe(() =>{
      this.isLoading = false;
        $('#editProject').modal('hide');
      })
  }

}
