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
  // reCAPTCHAVerified: boolean;
  isSignedLoading: boolean;

  public user = new user();
  registerFormValues: any;
  userFiltered: any[];

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    // this.reCAPTCHAVerified = false;
    this.isSignedLoading = false;
    this.currentUser = this._currentUserSubject.asObservable();
    // this.isUserExist();
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
      then((user) => {
        this.saveUserToLocalStorage(value, user);
      },
        (error) => {
          this.isSignedLoading = false;
          alert(error.message);
        });
  }

  signInWithPhoneNumber(value) {
    this.isSignedLoading = true;
    this.registerFormValues = value;
    // if (value.emailOrPhone.includes("+")) {
    //   this.userRegister(value)
    // } else {
    //   let countryCode = "+92";
    //   let extractPhoneNumber = value.emailOrPhone.substring(1);
    //   value.emailOrPhone = countryCode + extractPhoneNumber;
    //   this.userRegister(value)
    // }
    if (!value.emailOrPhone.includes("+")) {
      let countryCode = "+92";
      let extractPhoneNumber = value.emailOrPhone.substring(1);
      value.emailOrPhone = countryCode + extractPhoneNumber;
    }
    this.userRegister(value);

  }


  doRegisterWithEmail(value) {
    this.isSignedLoading = true;
    this.afAuth.auth.createUserWithEmailAndPassword(value.emailOrPhone, value.password).then(
      (result) => {
        if (result) {
          this.afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
              if (user.displayName == null) {
                user.updateProfile({
                  displayName: value.firstName + value.lastName,
                  photoURL: "https://www.pngitem.com/pimgs/m/20-203432_profile-icon-png-image-free-download-searchpng-ville.png"
                }).then((result) => {
                  this.saveUserToLocalStorage(value, user);
                  this.addUserWithId(this.user, user.uid).then((res) => { return });
                }, (error) => {
                  alert(error.message);
                });
              }
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
    this.isSignedLoading = true;
    this.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        if (result) {
          this.afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
              if (user.displayName == null) {
                user.updateProfile({
                  displayName: this.registerFormValues.firstName + this.registerFormValues.lastName,
                  photoURL: "https://www.pngitem.com/pimgs/m/20-203432_profile-icon-png-image-free-download-searchpng-ville.png"
                }).then((result) => {
                  this.saveUserToLocalStorage(this.registerFormValues, user);
                  this.addUserWithPhoneNumber(this.user, this.user.emailOrPhone).then((res) => { return });
                }, (error) => {
                  alert(error.message);
                });
              }
              else {
                this.saveUserToLocalStorage(this.registerFormValues, user);
              }

            }
          });
        }

        (error) => {
          this.isSignedLoading = false;
          alert(error.message)
        }
        // if (this.user) alert('You have successfully created an account!');
      })
      .catch((error) => {
        this.isSignedLoading = false;
        alert('Please enter correct otp code or code has been expired!.')
      });
  }

  private doRegisterWithPhone(value, appVerifier) {
    return from(this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier))
  }

  private userRegister(value) {
    this.isUserExist(value.emailOrPhone).then((exist) => {
      if (!exist) {
        if (this.registerFormValues.firstName) {
          this.doRegisterWithPhone(value, this.appVerifier)
            .subscribe((result) => {
              this.confirmationResult = result
              console.log(result);
              this.isSignedLoading = false;
            },
              (error) => {
                this.isSignedLoading = false;
                alert(error.message)
              });
        }
        else {
          alert('Please create your an account!');
          this.isSignedLoading = false;
        }
      }
      else {
        this.isSignedLoading = false;
        if (this.registerFormValues.firstName)
          alert("Already Registered");
        else {
          this.doRegisterWithPhone(value, this.appVerifier)
            .subscribe((result) => {
              this.confirmationResult = result
              console.log(result);
              this.isSignedLoading = false;
            },
              (error) => {
                this.isSignedLoading = false;
                alert(error.message)
              });
        }
      }
    });
  }

  private saveUserToLocalStorage(value, user) {
    this.isSignedLoading = false;

    this.user.id = user.uid;
    this.user.password = value.password;
    this.user.photoURL = user.photoURL;
    this.user.displayName = user.displayName;
    this.user.emailOrPhone = value.emailOrPhone;

    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this._currentUserSubject.next(this.user);
  }

  addUserWithId(user, uid) {
    const toSend = this.db.object('/users/' + uid);
    return toSend.set(user);
  }

  addUserWithPhoneNumber(user, phoneNumber) {
    const toSend = this.db.object('/usersWithPhoneNumber/' + phoneNumber);
    return toSend.set(user);
  }

  getUserById(uid) {
    return this.db.object('/users/' + uid);
  }
  getAllUsers() {
    return this.db.list('/users/');
  }

  isUserExist(emailOrPhone) {
    const dbRef = this.db.database.ref(`/usersWithPhoneNumber/${emailOrPhone}`)
    return dbRef.once('value').
      then((snapshot) => {
        return snapshot.exists();
      })
  }
}
