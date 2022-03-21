import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../../interfaces/login';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

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
    public loginService: LoginService) {
    this.isSignedIn = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'emailOrPhone': ['usman1@gmail.com', [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)]],
      'password': ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn(value: Login): void {
    this.authService.signIn(value)
  }
}
