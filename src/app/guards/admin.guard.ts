import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {Auth} from "../services/auth0.service";



@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      if(this.auth.isAdmin()){
        return true;
      } else {
        alert('Permission denied,only admin has access to this route!');
        this.auth.logout();
        return false;
      }
    } else {
      alert('Permission denied,please login!');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
