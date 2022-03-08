import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  isSignedIn: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
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
