import {Injectable, OnDestroy} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt'

import {Router} from "@angular/router";
import {authOptions} from "../dependencies/auth.options";
import {myConfig} from "../dependencies/auth.config";


// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth{

// Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, authOptions);

//Store profile object in auth class
  userProfile: any;


  constructor(private router: Router) {


    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));


    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(`Auth service 2: ${error}`);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;

      });

      if(this.loggedUser()){

      }

      setTimeout(() => { this.router.navigate(['/projects']) }, 1500);
    });

  };

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    // this.userProfile = undefined;
    this.router.navigate(['/'])
  };

  public isAdmin() {
    return this.userProfile && this.userProfile.app_metadata
      && this.userProfile.app_metadata.roles
      && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
  }

  public loggedUser(){
    if(this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.name){
      return this.userProfile.user_metadata.name
    }
  }

  public profilePic(){
    if(this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.user_avatar){
      return this.userProfile.user_metadata.user_avatar
    }
  }



}
