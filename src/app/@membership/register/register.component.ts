import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstName': [null, [Validators.required, Validators.minLength(3)]],
      'lastName': [null, [Validators.required, Validators.minLength(3)]],
      'emailOrPhone': [null, [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)]],
      'password': [null, Validators.required]
    });
  }
  
  signUp(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  signIn(value) {
    this.isSignedIn = true;
    this.authService.signIn(value)
      .then(res => {
        this.isSignedIn = false;
        alert("Your email and password has been verified.");
        this.router.navigate(['/dashboard']);
        $(document).ready(function () {
          $('#loginModalCenter').modal('hide');
        });
      }, err => {
        this.isSignedIn = false;
        alert(err);
      })
  }
}
