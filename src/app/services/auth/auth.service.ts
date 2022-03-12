import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth'
import { LoginService } from '../login/login.service';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { switchAll, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  User$: Observable<firebase.User>
  appVerifier: any;
  confirmationResult: any;
  reCAPTCHAVerified: boolean;
  isSignedLoading: boolean;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) {
    this.User$ = this.afAuth.authState;
    this.reCAPTCHAVerified = false;
    this.isSignedLoading = false;
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
        this.loginService.signInWithEmailAndPassword(value);
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
      this.loginService.doRegisterWithPhone(value, this.appVerifier).
      pipe(
        switchMap((re) => re )
      ).subscribe((res) => console.log(this.confirmationResult = res))
     
      
      // .subscribe((res) => console.log(res));
        // .subscribe((result) => (this.confirmationResult = result));
    } else {
      let countryCode = "+92";
      let extractPhoneNumber = value.emailOrPhone.substring(1);
      value.emailOrPhone = countryCode + extractPhoneNumber;
      this.loginService.doRegisterWithPhone(value, this.appVerifier)
        .subscribe((result) => (this.confirmationResult = result),
          (error) => alert(error.message));
    }
  }
}