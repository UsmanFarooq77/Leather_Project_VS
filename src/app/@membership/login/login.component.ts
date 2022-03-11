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

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService ) {
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'emailOrPhone': [null, [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)]],
      'password': [null, Validators.required]
    });
  }
  


  signIn(value) {
    // if (this.reCAPTCHAVerified == false) alert("Are you a human being? Please check the box I'm not a robot.");
    this.isSignedIn = true;
    this.authService.signIn(value)
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
  }


}
