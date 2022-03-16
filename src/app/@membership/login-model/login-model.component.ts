import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

import * as firebase from 'firebase';

declare var $: any;

@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.css']
})
export class LoginModelComponent implements OnInit {

  isLoginFormOpen: boolean;
  isLoginLoading: boolean;
  userName: void;
  isAdmin: boolean;
  admin: firebase.User;
  isGoogleLogin: boolean;
  isFacebookLogin: boolean;
  reCaptchaRenderId: number;

  constructor(
    public router: Router,
    public authService: AuthService,
    public loginService: LoginService) {

    this.isLoginFormOpen = true;
    this.isLoginLoading = false;
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
    this.reCaptchaRenderId = 0;
  }

  ngOnInit() {

    // this.isreCAPTCHAShow = 

    console.log(localStorage.getItem('reCaptchaRenderId'))

    $(document).ready(function () {
      $('#loginModalCenter').modal('show');
    });

    if (localStorage.getItem('google')) {
      this.isGoogleLogin = true;
    }
    if (localStorage.getItem('facebook')) {
      this.isFacebookLogin = true;
    }

    this.authService.User$.subscribe(admin => {
      if (admin) {
        this.admin = admin;
        this.isAdmin = true;
        // let returnUrl = localStorage.getItem('returnUrl');
        // this.router.navigateByUrl(returnUrl);
        this.hideModel();
        // this.router.navigate(['/']);
      }
      else {
        this.isAdmin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        // localStorage.clear();
      }
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    $('#loginModalCenter').on('hidden.bs.modal', () => {
      this.loginService.pushOpenLoginModal(false);
    });
    
    if (!localStorage.getItem('reCaptchaRenderId')) {
      this.reCaptchaRenderId = 1;
      localStorage.setItem('reCaptchaRenderId', this.reCaptchaRenderId.toString());
      console.log(this.reCaptchaRenderId);
      console.log(localStorage.getItem('reCaptchaRenderId'))
    }
  }

  openLoginForm() {
    this.isLoginFormOpen = true;
  }

  openRegisterForm() {
    this.isLoginFormOpen = false;
  }

  socialLogin(value: string) {
    if (value === 'google') {
      this.isGoogleLogin = true;
      localStorage.setItem('google', value);
    }
    else {
      this.isFacebookLogin = true;
      localStorage.setItem('facebook', value);
    }
    this.authService.login(value);
    // if (this.userName != null || this.userName != undefined) {
    //   this.isLoginLoading = false;
    // }
  }

  hideModel() {
    $(document).ready(function () {
      $('#loginModalCenter').modal('hide');
    });
  }

  logout() {
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
    this.isAdmin = false;
    localStorage.removeItem('reCaptchaRenderId');
    this.authService.logout();
  }
}
