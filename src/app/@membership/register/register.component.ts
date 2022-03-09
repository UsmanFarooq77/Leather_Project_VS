import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';


import * as firebase  from 'firebase'

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  // EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  EMAILORPHONE_REGEXP = /^(?:\d{11}|\w+@\w+\.\w{2,3})$/i;
  isSignedIn: boolean;
  windowRef: any;
  verificationCode: string;
  user: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private afAuth: AngularFireAuth) {
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.windowRef = this.loginService.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
    this.registerForm = this.formBuilder.group({
      'firstName': ['usman', [Validators.required, Validators.minLength(3)]],
      'lastName': ['ali', [Validators.required, Validators.minLength(3)]],
      'emailOrPhone': ['+923456572721', [Validators.required]],
      'password': ['123456', Validators.required]
    });
  }

  sendLoginCode(value) {

    const appVerifier = this.windowRef.recaptchaVerifier;

    // const num = this.phoneNumber.e164;

    this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier)
    // firebase.auth().signInWithPhoneNumber(value.emailOrPhone, appVerifier)
            .then(result => {
              console.log(result)
                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    console.log(result)
                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }
  
  signUp(value) {
    console.log(value);
    this.authService.doRegister(value)
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
    this.authService.signIn(value)
      .then(res => {
        this.isSignedIn = false;
        alert("Your email and password has been verified.");
        this.router.navigate(['/']);
        $(document).ready(function () {
          $('#loginModalCenter').modal('hide');
        });
      }, err => {
        this.isSignedIn = false;
        alert(err);
      })
  }
}
