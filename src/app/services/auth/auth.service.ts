import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'
import { LoginService } from '../login/login.service';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { RecaptchaService } from '../reCAPTCHA/recaptcha.service';

@Injectable()
export class AuthService {

  User$: Observable<firebase.User>


  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private recaptchaService: RecaptchaService) {
    this.User$ = this.afAuth.authState;
    // this.afAuth.authState.subscribe();
  }

  login(value) {
    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl',returnUrl);
    if (value === 'google') {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
    else {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    }
  }

  signUp(value) {
    if (this.recaptchaService.reCAPTCHAVerified) {
      if (value.emailOrPhone.includes("@")) {
        this.loginService.doRegisterWithEmail(value);
      } else {
        this.loginService.signInWithPhoneNumber(value);
      }
    }
    else {
      this.recaptchaService.reCAPTCHAVerifiedMessage();
    }
  }

  signIn(value) {
    if (this.recaptchaService.reCAPTCHAVerified) {
      if (value.emailOrPhone.includes("@")) {
        this.loginService.signInWithEmailAndPassword(value);
      } else {
        this.loginService.signInWithPhoneNumber(value);
      }
    }
    else {
      this.recaptchaService.reCAPTCHAVerifiedMessage();
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('returnUrl');
    this.loginService._currentUserSubject.next(null);
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}