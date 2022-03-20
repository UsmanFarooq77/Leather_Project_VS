import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

import * as firebase from 'firebase';
import { RecaptchaService } from '../../services/reCAPTCHA/recaptcha.service';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {

  windowRef: any;
  isRecaptchaContainerId: boolean;

  constructor(
    public recaptchaService: RecaptchaService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.windowRef = this.loginService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container-login",
      {
        size: "normal",
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.recaptchaService.reCAPTCHAVerified = true;
        },
        'expired-callback': (response) => {
          // Response expired. Ask user to solve reCAPTCHA again.
          this.recaptchaService.reCAPTCHAVerified = false;
        }
      }
    );

    this.windowRef.recaptchaVerifier
      .render()
      .then((recaptchaContainerId) => {
        this.isRecaptchaContainerId = true;
        this.recaptchaService._isreCAPTCHAShowSubject.next(false);
      })
      .catch((error) => {
        setInterval(() => {
          alert(error.message + ' Please reload your application.');
        }, 10000);
      });

    this.loginService.appVerifier = this.windowRef.recaptchaVerifier;
  }

}
