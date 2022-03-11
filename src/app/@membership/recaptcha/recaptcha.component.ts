import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

import * as firebase from 'firebase'

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {

  windowRef: any;
  reCAPTCHAVerified: boolean;
  isRecaptchaContainerId: boolean;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.windowRef = this.loginService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container-login",
      {
        size: "normal",
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.reCAPTCHAVerified = response;
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
