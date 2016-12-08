import { Component, OnInit } from '@angular/core';
import {Auth} from "../../services/auth0.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
