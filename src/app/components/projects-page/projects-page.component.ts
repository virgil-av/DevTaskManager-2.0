import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
const uniqid: any = require('uniqid');

declare let $:any;

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
})


export class ProjectsPageComponent implements OnInit {

  formAddProject: FormGroup;
  anyErrors: Error;
  isLoading: boolean = false;
  allProjects: any[];


  constructor(private formBuilder: FormBuilder, private db: DatabaseService) {

    this.formAddProject = formBuilder.group({
      "projectName": ['',[Validators.required,Validators.maxLength(40)]],
      "creationDate": new Date(),
      "colorId": this.getRandomColor(),
      "description": [''],
      "id": this.generateUniqueId()

    })

  }

  ngOnInit() {
    this.db.getAllProjects().subscribe(response =>{
      this.allProjects = response;
      console.log(response);
    },
      error => this.anyErrors = error
    )

  }

  addNewProject(){
    this.isLoading = true;

    this.db.createNewProject(this.formAddProject.value).subscribe(response => {

      this.db.addProjectToList(this.formAddProject.value).subscribe(response =>{

        this.allProjects.push(response);

          this.formAddProject.reset({
            "id": this.generateUniqueId(),
            "creationDate": new Date(),
            "colorId": this.getRandomColor(),
            "projectName": '',
            "description": ''
          });

          this.isLoading = false;

          $('#addProject').modal('hide'); //closes modal window on submission complete

        },
        error => this.anyErrors = error);
    },
      error => this.anyErrors = error
    )

    console.log(this.formAddProject)

  }

  generateUniqueId(){
    return uniqid() + 'av' + (Math.floor((Math.random() * 10000000) + 1)).toString(16);
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }






}