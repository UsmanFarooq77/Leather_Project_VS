import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { user } from '../../models/user-model';
import { User } from '../../interfaces/user';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { RecaptchaService } from '../reCAPTCHA/recaptcha.service';

@Injectable()
export class LoginService {

  public _openLoginModal = new BehaviorSubject(false);
  public _currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
  public currentUser: Observable<User>;

  appVerifier: any;
  confirmationResult: any;
  isSignedLoading: boolean;

  public user = new user();
  registerFormValues: any;
  userFiltered: any[];

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private recaptchaService: RecaptchaService) {
    this.isSignedLoading = false;
    this.currentUser = this._currentUserSubject.asObservable();
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
    this.isLoading(true);
    this.afAuth.auth.signInWithEmailAndPassword(value.emailOrPhone, value.password).
      then((user) => {
        this.userService.getUserById(user.uid).subscribe((user) => {
          this.saveUserToLocalStorage(value, user);
          alert('You has been successfully verified.');
        })
      },
        (error) => {
          this.isLoading(false);
          alert(error.message);
        });
  }

  signInWithPhoneNumber(value) {
    this.isLoading(true);
    this.registerFormValues = value;
    if (!value.emailOrPhone.includes("+")) {
      let countryCode = "+92";
      let extractPhoneNumber = value.emailOrPhone.substring(1);
      value.emailOrPhone = countryCode + extractPhoneNumber;
    }
    this.userRegister(value);
  }

  doRegisterWithEmail(value) {
    this.isLoading(true);
    this.afAuth.auth.createUserWithEmailAndPassword(value.emailOrPhone, value.password).then(
      (result) => {
        if (result) {
          this.authStateChanged(value, result);
        }
        (error) => {
          this.isLoading(false);
          alert(error.message)
        }
      }
    ).catch((error) => {
      this.isLoading(false);
      alert(error.message)
    })
  }

  verifyOtpCode(verificationCode) {
    if(!this.recaptchaService.reCAPTCHAVerified) return this.recaptchaService.reCAPTCHAVerifiedMessage(); 
    this.isSignedLoading = true;
    this.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        if (result) {
          if(this.registerFormValues.firstName){
          this.authStateChanged(this.registerFormValues, result.user);
          }
          else {
            this.userService.getUserWithPhoneNumber(result.user.phoneNumber).subscribe((user) => {
              this.saveUserToLocalStorage(result.user.phoneNumber , user)
            },
            (error) => {
              alert(error.message);
            });
          }
        }
        (error) => {
          this.isLoading(false);
          alert(error.message)
        }
      })
      .catch((error) => {
        this.isLoading(false);
        alert(error.message+'Please enter correct otp code or code has been expired.')
      });
  }

  private doRegisterWithPhone(value, appVerifier) {
    this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier)
      .then((result) => {
        this.confirmationResult = result;
        this.isLoading(false);
      },
        (error) => {
          this.isLoading(false);
          alert(error.message)
        });
  }

  private userRegister(value) {
    this.userService.isUserExist(value.emailOrPhone).then((exist) => {
      if (!exist) {
        if (this.registerFormValues.firstName) {
          this.doRegisterWithPhone(value, this.appVerifier)
        }
        else {
          alert('Please create your an account.');
          this.isLoading(false);
        }
      }
      else {
        this.isLoading(false);
        if (this.registerFormValues.firstName)
          alert("The phone number is already in use by another account.");
        else {
          this.passwordVerify(value).
          then((verification) => {
            if(verification){
              this.doRegisterWithPhone(value, this.appVerifier);
            }
            else {
              alert('Please enter correct password.');
              return;
            }
          });
        }
      }
    });
  }

  private passwordVerify(value){
    return this.userService.userPasswordVerify(value.emailOrPhone, value.password)
  }

  private authStateChanged(value, user) {
    this.saveUserToLocalStorage(value, user);
    this.user.password = value.password;
    if (value.emailOrPhone.includes('@')) {
      this.userService.addUserWithId(this.user, user.uid).then((res) => {
        alert('Congratulation! ' + value.firstName + ' You has been successfully registered.');
      },
        (error) => {
          alert(error.message);
        });
    }
    else {
      this.user.password = value.password;
      this.userService.addUserWithPhoneNumber(this.user, this.user.emailOrPhone).then((res) => {
        alert('Congratulation! ' + value.firstName + ' You has been successfully registered.');
      },
        (error) => {
          alert(error.message);
        });
    }
  }

  private saveUserToLocalStorage(value, user) {
    this.isLoading(false);

    this.user.id = user.uid ? user.uid : user.id;
    this.user.firstName = value.firstName ? value.firstName : user.firstName;
    this.user.lastName = value.lastName? value.lastName : user.lastName;
    this.user.emailOrPhone = value.emailOrPhone ? value.emailOrPhone : value;

    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this._currentUserSubject.next(this.user);
  }

  private isLoading(value: boolean) {
    this.isSignedLoading = value;
  }
}