import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../../interfaces/login';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';
import { LoginModelComponent } from '../login-model/login-model.component';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  // EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  // EMAILORPHONE_REGEXP = /^(?:\d{11}|\w+@\w+\.\w{2,3})$/i;
  EMAILORPHONE_REGEXP = /^(?:\d{11}|\+[1-9]{1}[0-9]{3,14}|\w+@\w+\.\w{2,3})$/i;
  isSignedIn: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loginService: LoginService,
    public loginModalRef: LoginModelComponent) {
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'emailOrPhone': [null, [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)]],
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn(value: Login): void {
    this.authService.signIn(value)
  }
  navigateToContact() {
    alert('Please send us your query or Ask any question?');
    this.loginModalRef.hideModel();
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth'
    });
    this.router.navigate(['contact']);
  }
}
