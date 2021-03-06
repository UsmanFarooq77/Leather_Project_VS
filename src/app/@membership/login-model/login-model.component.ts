import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

import * as firebase from 'firebase';
import { RecaptchaService } from '../../services/reCAPTCHA/recaptcha.service';

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
  isreCAPTCHAShow: boolean;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public loginService: LoginService,
    private recaptchaService: RecaptchaService) {

    this.isLoginFormOpen = true;
    this.isLoginLoading = false;
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
    this.isreCAPTCHAShow = true;
  }

  ngOnInit() {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || this.router.url;
    localStorage.setItem('returnUrl',returnUrl);

    this.recaptchaService._isreCAPTCHAShow.subscribe((reCAPTCHA) => this.isreCAPTCHAShow = reCAPTCHA);

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
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
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
      this.recaptchaService._isreCAPTCHAShowSubject.next(true);
      this.recaptchaService.reCAPTCHAVerified = false;
      this.loginService.confirmationResult = null;
    });

  }

  openLoginForm() {
    this.isLoginFormOpen = true;
    this.loginService.confirmationResult = null;
  }

  openRegisterForm() {
    this.isLoginFormOpen = false;
    this.loginService.confirmationResult = null;
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
    this.authService.logout();
  }
}
