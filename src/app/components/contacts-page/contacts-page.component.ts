import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";

declare let $:any;

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {

  formAddContact: FormGroup;
  anyErrors: Error;
  isLoading: boolean = false;
  contactsList: any[];

  constructor(private formBuilder: FormBuilder, private db: DatabaseService) {
    this.formAddContact = formBuilder.group({
      "firstName": ['',Validators.required],
      "lastName": ['',Validators.required],
      "email":['', Validators.compose([
        Validators.required,
        this.isValidEmail
      ])],
      "password":['Test123', Validators.required],
      "authAccount": false

    })

  }

  ngOnInit() {
    this.db.getContacts()
      .subscribe(contacts =>{
        this.contactsList = contacts;
        console.log(contacts)
      },error => this.anyErrors = error)
  }


  isValidEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  addNewContact(){
    this.isLoading = true;

    this.db.createNewContact(this.formAddContact.value)
      .subscribe(response =>{
        this.contactsList.push(response);

        this.formAddContact.reset({
          "firstName": '',
          "lastName": '',
          "email":'',
          "password": 'Test123',
          "authAccount": false
        });

        $('#addContact').modal('hide'); //closes modal window

        this.isLoading = false;

      },error => this.anyErrors = error)
  }

}
