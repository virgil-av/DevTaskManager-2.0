import {Component, OnInit} from '@angular/core';
import {Auth} from "../../services/auth0.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: Auth) {}


  ngOnInit() {
    this.auth.login();
  }

}

