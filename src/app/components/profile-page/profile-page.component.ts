import { Component, OnInit } from '@angular/core';
import {Auth} from "../../services/auth0.service";
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import * as _ from "lodash";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  editProfileForm: FormGroup;
  editPasswordForm: FormGroup;
  userName: string;
  userAvatar: string;
  anyError: Error;
  isLoading: boolean = false;
  loadingState: string = 'default'

  constructor(private auth: Auth,
              private formBuilder: FormBuilder) {

    this.editProfileForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'userAvatar': ['', Validators.compose([
        Validators.required,
        this.isValidAvatar.bind(this)
      ])]
    });

    this.editPasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required]],
      'repeatPassword': ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])]

    });

  }

  ngOnInit() {
    this.userName = this.auth.userProfile.user_metadata.name;
    this.userAvatar = this.auth.userProfile.user_metadata.user_avatar;
  }

  isValidAvatar(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/\.(jpeg|jpg|gif|png)$/)) {
      return {noAvatar: true};
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.editPasswordForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.editPasswordForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }


  resetForm() {
    this.editProfileForm.reset({
      'name': this.auth.userProfile.user_metadata.name,
      'userAvatar': this.auth.userProfile.user_metadata.user_avatar
    });
  }

  updateUser(){
    this.isLoading = true;
    this.loadingState = 'profile';

    let updatedContact = {
      'password': this.editProfileForm.value.password,
      'user_metadata': {
        'name': this.editProfileForm.value.name,
        'user_avatar': this.editProfileForm.value.userAvatar,
      }
    };

    this.auth.updateUser(updatedContact, this.auth.userProfile.user_id)
      .subscribe(response => {

          let updatedProfile = _.assign(this.auth.userProfile, {
            'user_metadata': {
              'name': this.editProfileForm.value.name,
              'user_avatar': this.editProfileForm.value.userAvatar,
            }
          });

          localStorage.setItem('profile', JSON.stringify(updatedProfile));
          this.resetForm();
          this.isLoading = false;
          this.loadingState = 'default';
        },
        error => this.anyError = error
      )
  }

  updatePassword(){
    this.isLoading = true;
    this.loadingState = 'password';

    let updatedContact = {
      'password': this.editPasswordForm.value.password,
    };

    this.auth.updateUser(updatedContact, this.auth.userProfile.user_id)
      .subscribe(response => {
          this.editPasswordForm.reset({'password': '', 'repeatPassword':''});

          this.isLoading = false;
          this.loadingState = 'default';
        },
        error => this.anyError = error
      )
  }


}
