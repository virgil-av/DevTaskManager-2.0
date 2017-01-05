import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import * as _ from "lodash";
import {Auth} from "../../services/auth0.service";
import {myConfig} from "../../dependencies/auth.config";

declare let $: any;

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {

  formAddContact: FormGroup;
  formEditContact: FormGroup;
  anyError: Error;
  isLoading: boolean = false;
  contactsList: any[];
  selectedUser = {id: '', name: '', role: ''};

  constructor(private formBuilder: FormBuilder, private auth: Auth) {
    this.formAddContact = formBuilder.group({
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "email": ['', Validators.compose([
        Validators.required,
        this.isValidEmail
      ]), this.isDuplicateEmail.bind(this)],
      "password": ['Test123', Validators.required],
      "userPermission": ['read', Validators.required],
      "userAvatar": [myConfig.userAvatar,Validators.required]
    });


      this.formEditContact = this.formBuilder.group({
        "id": this.selectedUser.id,
        "userName": [this.selectedUser.name,Validators.required],
        "userPermission": [this.selectedUser.role,Validators.required],
        "userAvatar": [myConfig.userAvatar,Validators.required]
      })


  }

  ngOnInit() {
    this.getContactList();
  }


  isValidEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  isDuplicateEmail(control: FormControl) {
    let promise = new Promise<any>(
      (resolve, reject) => {
        let contact = _.find(this.contactsList,{email: control.value});

        if(contact){
          resolve({'duplicate': true});
        }else{
          resolve(null);
        }
      }
    );
    return promise;
  }

  resetForm(){
    this.formAddContact.reset({
      "firstName": '',
      "lastName": '',
      "email": '',
      "password": 'Test123',
      "userPermission": 'read',
      "userAvatar": 'http://i64.tinypic.com/kal4t0.jpg'
    });

  }

  getContactList(){
    this.auth.getListOfUsers()
      .subscribe(users => {
          this.contactsList = users;
        },
        error => this.anyError = error
      );
  }


  addNewContact() {
    this.isLoading = true;

    let user = {
      'connection': 'Username-Password-Authentication',
      'email': this.formAddContact.value.email,
      'password': this.formAddContact.value.password,
      'user_metadata': {
        'name': _.capitalize(this.formAddContact.value.firstName)  + ' ' + _.capitalize(this.formAddContact.value.lastName),
        'role': this.formAddContact.value.userPermission,
        'user_avatar': this.formAddContact.value.userAvatar,
        'reset_password': true
      }
    };

    this.auth.createNewUser(user)
      .subscribe(response => {
        this.contactsList.push(response);

        this.resetForm();

        $('#addContact').modal('hide'); //closes modal window

        this.isLoading = false;
      },
        error => this.anyError = error
      )
  }

  deleteUser(userId: string){
    this.auth.deleteUser(userId)
      .subscribe( () => {
        _.remove(this.contactsList,{
          "user_id": userId
        });
      })
  }

  selectContact(user: any){
    this.selectedUser.id = user.user_id;
    this.selectedUser.name = user.user_metadata.name;
    this.selectedUser.role = user.user_metadata.role;
    $('#editContact').modal('show');
  }

  updateContact(){
    this.isLoading = true;

    let updatedContact = {
      'user_metadata': {
        'name': this.formEditContact.value.userName,
        'role': this.formEditContact.value.userPermission,
        'user_avatar': this.formEditContact.value.userAvatar
      }
    };

    this.auth.updateUser(updatedContact, this.selectedUser.id)
      .subscribe(response => {
          let contact = _.find(this.contactsList, {
            "user_id": response.user_id
          });

          _.assign(contact, response);

          $('#editContact').modal('hide'); //closes modal window

          this.isLoading = false;
        },
        error => this.anyError = error
      )

  }

  resetPassword(userId: string){
    this.selectedUser.id = userId;

    this.isLoading = true;

    let updatedContact = {
      'user_metadata': {
        "reset_password": true
      }
    };

    this.auth.updateUser(updatedContact, userId)
      .subscribe( () => {
          this.isLoading = false;
        },
        error => this.anyError = error
      )

  }





}
