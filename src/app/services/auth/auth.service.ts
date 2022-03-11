import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

@Injectable()
export class AuthService {

  User$: Observable<firebase.User>
  appVerifier: any;
  confirmationResult: any;
  reCAPTCHAVerified: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
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
        this.doRegisterWithEmail(value);
      } else {
        this.signInWithPhoneNumber(value);
      }
    }
    else {
      this.reCAPTCHAVerifiedMessage();
    }
  }

  signIn(value) {
    if (this.reCAPTCHAVerified) {
      if (value.emailOrPhone.includes("@")) {
        this.signInWithEmailAndPassword(value);
      } else {
        this.signInWithPhoneNumber(value);
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

  private signInWithPhoneNumber(value) {
    if (value.emailOrPhone.includes("+")) {
      this.doRegisterWithPhone(value, this.appVerifier)
        .subscribe((result) => (this.confirmationResult = result));
    } else {
      let countryCode = "+92";
      let extractPhoneNumber = value.emailOrPhone.substring(1);
      value.emailOrPhone = countryCode + extractPhoneNumber;
      this
        .doRegisterWithPhone(value, this.appVerifier)
        .subscribe((result) => (this.confirmationResult = result),
          (error) => alert(error.message));
    }
  }

  private doRegisterWithEmail(value) {
    this.afAuth.auth.createUserWithEmailAndPassword(value.emailOrPhone, value.password).then(
      (res) => console.log(res),
      (error) => alert(error.message)
    )
  }

  private doRegisterWithPhone(value, appVerifier) {
    return from(this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier));
  }

  private signInWithEmailAndPassword(value) {
    this.afAuth.auth.signInWithEmailAndPassword(value.emailOrPhone, value.password).
      then((res) => console.log(res));
  }
}