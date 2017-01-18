import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {DatabaseService} from "../../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  projectId: string;
  categoryList: any[] = [];
  anyError: Error;
  formAddToCategory: FormGroup;
  isLoading: boolean;

  constructor(private db: DatabaseService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder ) {

    this.formAddToCategory = formBuilder.group({
      "name": ['',Validators.required, this.isDuplicateCategory.bind(this)],
      "id": [this.db.generateUniqueId()]
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.projectId = id;
          this.db.getProjectCategories(id).subscribe(response =>{
              this.categoryList = response;
            },
            error => this.anyError = error
          )
          },
          error => this.anyError = error
        )

  }


  isDuplicateCategory(control: FormControl) {
    let promise = new Promise<any>(
      (resolve, reject) => {
        let category = _.find(this.categoryList,{name: control.value});

        if(category){
          resolve({'duplicate': true});
        }else{
          resolve(null);
        }
      }
    );
    return promise;
  }


  addCategory(){
    this.db.addCategory(this.formAddToCategory.value,this.projectId)
      .subscribe(response =>{
          this.categoryList.push(response);
          this.formAddToCategory.reset({"name":'', "id": this.db.generateUniqueId()});
        },
        error => this.anyError = error
      )
  }

  removeCategory(categoryId: string) {
    this.db.deleteCategory(this.projectId, categoryId)
      .subscribe(() => {
          _.remove(this.categoryList, {
            "id": categoryId
          });
        },
        error => this.anyError = error
      )
  }

}
