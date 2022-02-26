import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './services/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public router: Router, private authService: AuthService) {
  }
  ngOnInit() {}
}
