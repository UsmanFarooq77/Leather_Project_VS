import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

declare var $: any;

import * as firebase from 'firebase'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  // EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  // EMAILORPHONE_REGEXP = /^(?:\d{11}|\w+@\w+\.\w{2,3})$/i;
  EMAILORPHONE_REGEXP = /^(?:\d{11}|\+[1-9]{1}[0-9]{3,14}|\w+@\w+\.\w{2,3})$/i;
  isSignedIn: boolean;
  windowRef: any;
  verificationCode: string;
  user: any;
  reCAPTCHAVerified: boolean;
  isRecaptchaContainerId: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService) {
    this.isSignedIn = false;
  }

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
      .catch((error) => {return});
    this.registerForm = this.formBuilder.group({
      'emailOrPhone': [null, [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)]],
      'password': [null, Validators.required]
    });
  }
  
  signUp(value) {
    // this.authService.doRegister(value)
      // .then(res => {
      //   this.errorMessage = "";
      //   this.successMessage = "Your account has been created";
      // }, err => {
      //   this.errorMessage = err.message;
      //   this.successMessage = "";
      // })
  }

  signIn(value) {
    this.isSignedIn = true;
    // this.authService.signIn(value)
    //   .then(res => {
    //     this.isSignedIn = false;
    //     alert("Your email and password has been verified.");
    //     // this.loginService.pushOpenLoginModal(false);
    //     // this.router.navigate(['/']);
    //     // $(document).ready(function () {
    //     //   $('#loginModalCenter').modal('hide');
    //     // });
    //   }, err => {
    //     this.isSignedIn = false;
    //     alert(err);
    //   })
      if (value.emailOrPhone.includes("@")) {
        this.authService.doRegisterWithEmail(value);
      } else {
        const appVerifier = this.windowRef.recaptchaVerifier;
        if (value.emailOrPhone.includes("+")) {
          this.authService.doRegisterWithPhone(value, appVerifier)
            .subscribe((result) => (this.windowRef.confirmationResult = result));;
        } else {
          let countryCode = "+92";
          let extractPhoneNumber = value.emailOrPhone.substring(1);
          value.emailOrPhone = countryCode + extractPhoneNumber;
          this.authService
            .doRegisterWithPhone(value, appVerifier)
            .subscribe((result) => (this.windowRef.confirmationResult = result),
              (error) => alert(error.message));
        }
      }
  }

  verifyOtpCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        console.log(result);
        this.user = result.user;
        if (this.user) alert('You have successfully created an account!');
      })
      .catch((error) => alert('Please enter correct otp code or code has been expired!.'));
  }
}
