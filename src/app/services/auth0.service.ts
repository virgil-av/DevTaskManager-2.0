import {Injectable, OnDestroy} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt'

import {Router} from "@angular/router";
import {authOptions} from "../dependencies/auth.options";
import {myConfig} from "../dependencies/auth.config";
import {Http, Headers} from "@angular/http";
import {DatabaseService} from "./database.service";



// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth{

// Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, authOptions);

//Store profile object in auth class
  userProfile: any;


  constructor(private router: Router,
              private http: Http,
              private db: DatabaseService) {


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
      setTimeout(() => {
        this.router.navigate(['/projects']);
        this.activityLog('has logged in');
      }, 1500);
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
    this.activityLog('has logged out');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/login'])
  };

  isAdmin() {
    return this.userProfile && this.userProfile.roles.indexOf('admin') > -1;
  }

  loggedUserName(){
    if(this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.name){
      return this.userProfile.user_metadata.name
    }
  }

  loggedUserId(){
    if(this.userProfile && this.userProfile.identities && this.userProfile.identities[0].user_id){
      return this.userProfile.identities[0].user_id
    }
  }

  profilePic(){
    if(this.userProfile && this.userProfile.user_metadata && this.userProfile.user_metadata.user_avatar){
      return this.userProfile.user_metadata.user_avatar
    }
  }

  getListOfUsers(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',myConfig.token);
    return this.http.get(myConfig.domainUrl + myConfig.usersApiUrl + myConfig.usersQuery,{headers:headers})
      .map(response => response.json());
  }

  createNewUser(body: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',myConfig.token);
    return this.http.post(myConfig.domainUrl + myConfig.usersApiUrl,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }

  updateUser(body:any, userId: string){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',myConfig.token);
    return this.http.patch(myConfig.domainUrl + myConfig.usersApiUrl + '/' + userId,JSON.stringify(body),{headers:headers})
      .map(response => response.json());
  }

  deleteUser(userId: string){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',myConfig.token);
    return this.http.delete(myConfig.domainUrl + myConfig.usersApiUrl + '/' + userId,{headers:headers})
  }


  activityLog(action: string){
    // this function will track the activity from each action performed on the app
    let activity = {
      "who": this.loggedUserName(),
      "action": action,
      "date": new Date()
    };

    this.db.addToActivity(activity).subscribe();
  }

}
