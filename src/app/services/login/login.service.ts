import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { from } from 'rxjs/observable/from';

import * as firebase from 'firebase'
import { user } from '../../models/user-model';
import { User } from '../../interfaces/user';

@Injectable()
export class LoginService {

  public _openLoginModal = new BehaviorSubject(false);
  public _currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))

  public currentUser: Observable<User>;

  appVerifier: any;
  confirmationResult: any;
  reCAPTCHAVerified: boolean;
  isSignedLoading: boolean;
  // currentUser: string;
  
  public user = new user();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.reCAPTCHAVerified = false;
    this.isSignedLoading = false;
    this.currentUser = this._currentUserSubject.asObservable();
    // this.currentUser = '';
  }

  get windowRef() {
    return window;
  }

  public pushOpenLoginModal(value: boolean) {
    this._openLoginModal.next(value);
  }
  public pullOpenLoginModal(): Observable<boolean> {
    return this._openLoginModal.asObservable();
  }

  signInWithEmailAndPassword(value) {
    this.isSignedLoading = true;
    this.afAuth.auth.signInWithEmailAndPassword(value.emailOrPhone, value.password).
      then((res) => {
        this.isSignedLoading = false;
      },
        (error) => {
          this.isSignedLoading = false;
          alert(error.message);
        });
  }



  signInWithPhoneNumber(value) {
    if (value.emailOrPhone.includes("+")) {
      this.doRegisterWithPhone(value, this.appVerifier)
        .subscribe((result) => (this.confirmationResult = result));
    } else {
      let countryCode = "+92";
      let extractPhoneNumber = value.emailOrPhone.substring(1);
      value.emailOrPhone = countryCode + extractPhoneNumber;
      this.doRegisterWithPhone(value, this.appVerifier)
        .subscribe((result) => (this.confirmationResult = result),
          (error) => alert(error.message));
    }
  }


  doRegisterWithEmail(value) {
    this.isSignedLoading = true;
    this.afAuth.auth.createUserWithEmailAndPassword(value.emailOrPhone, value.password).then(
      (result) => {
        if (result) {
          this.afAuth.auth.onAuthStateChanged((user) => {
            if (user.displayName == null) {
              user.updateProfile({
                displayName: value.firstName + value.lastName,
                photoURL: "https://www.w3schools.com/howto/img_forest.jpg"
              }).then((result) => {
                this.isSignedLoading = false;
                // this.currentUser = user.displayName;

                this.user.id = user.uid;
                this.user.firstName = value.firstName;
                this.user.lastName = value.lastName;
                this.user.password = value.password;
                
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                this._currentUserSubject.next(this.user);
              }, (error) => {
                alert(error.message);
              });

            }
          });
        }
        // this.addUser(res, res.uid).then((res) => alert(res)),
        (error) => {
          this.isSignedLoading = false;
          alert(error.message)
        }

      }
    ).catch((error) => {
      this.isSignedLoading = false;
      alert(error.message)
    })
  }



  verifyOtpCode(verificationCode) {
    this.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        // this.user = result.user;
        // if (this.user) alert('You have successfully created an account!');
      })
      .catch((error) => alert('Please enter correct otp code or code has been expired!.'));
  }

  private doRegisterWithPhone(value, appVerifier) {
    return from(this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier))
  }

  addUser(user, uid) {
    const toSend = this.db.object('/users/' + uid);
    return toSend.set({ name: 'usman' });
  }

  getUser(uid) {
    return this.db.object('/users/' + uid)
  }
}
