import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'
import { LoginService } from '../login/login.service';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  User$: Observable<firebase.User>
  reCAPTCHAVerified: boolean;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) {
    this.User$ = this.afAuth.authState;
    this.reCAPTCHAVerified = false;
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
    if (this.reCAPTCHAVerified) {
      if (value.emailOrPhone.includes("@")) {
        this.loginService.doRegisterWithEmail(value);
      } else {
        this.loginService.signInWithPhoneNumber(value);
      }
    }
    else {
      this.reCAPTCHAVerifiedMessage();
    }
  }

  signIn(value) {
    if (this.reCAPTCHAVerified) {
      if (value.emailOrPhone.includes("@")) {
        this.loginService.signInWithEmailAndPassword(value);
      } else {
        this.loginService.signInWithPhoneNumber(value);
      }
    }
    else {
      this.reCAPTCHAVerifiedMessage();
    }
  }

  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut();
  }

  private reCAPTCHAVerifiedMessage() {
    alert("Are you a human being? Please check the box I'm not a robot.");
  }
}