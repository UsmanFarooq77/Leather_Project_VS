import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

import * as firebase from 'firebase'

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  // EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  EMAILORPHONE_REGEXP = /^(?:\d{11}|\+[1-9]{1}[0-9]{3,14}|\w+@\w+\.\w{2,3})$/i;
  isSignedIn: boolean;
  windowRef: any;
  verificationCode: string;
  user: any;
  reCAPTCHAVerified: any;
  isRecaptchaContainerId: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService,
  ) {
    this.isSignedIn = false;
    this.reCAPTCHAVerified = null;
    this.isRecaptchaContainerId = false;
  }

  ngOnInit() {
    this.windowRef = this.loginService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
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
      .catch((error) => alert(error.message));

    this.registerForm = this.formBuilder.group({
      firstName: ["usman", [Validators.required, Validators.minLength(3)]],
      lastName: ["ali", [Validators.required, Validators.minLength(3)]],
      emailOrPhone: [
        "+923456572721",
        [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)],
      ],
      password: ["123456", Validators.required],
    });
  }

  signUp(value) {
    if (this.reCAPTCHAVerified == null) alert("Are you a human being? Please check the box I'm not a robot.");
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
    console.log(value);

    // .then(res => {
    //   this.errorMessage = "";
    //   this.successMessage = "Your account has been created";
    // }, err => {
    //   this.errorMessage = err.message;
    //   this.successMessage = "";
    // })
  }

  verifyOtpCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        console.log(result);
        this.user = result.user;
        if (this.user) alert('You have successfully created an account with your phone number!');
      })
      .catch((error) => console.log(error, "Incorrect code entered?"));
  }
}
