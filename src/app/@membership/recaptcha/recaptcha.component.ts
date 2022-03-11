import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {

  windowRef: any;
  isRecaptchaContainerId: boolean;

  constructor(
    public authService: AuthService,
    private loginService: LoginService ) { }

  ngOnInit() {
    this.windowRef = this.loginService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container-login",
      {
        size: "normal",
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.authService.reCAPTCHAVerified = true;
        },
        'expired-callback': (response) => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      }
    );

    this.windowRef.recaptchaVerifier
      .render()
      .then((recaptchaContainerId) => {
        this.isRecaptchaContainerId = true;
      })
      .catch((error) => { return });

    this.authService.appVerifier = this.windowRef.recaptchaVerifier;
  }

}
