import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  public _openLoginModal = new BehaviorSubject(false);

  isSignedLoading: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
    this.isSignedLoading = false;
  }

  get windowRef() {
    return window
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
        console.log(res)
        this.isSignedLoading = false;
      },
        (error) => {
          this.isSignedLoading = false;
          alert(error.message);
        });
  }

  doRegisterWithEmail(value) {
    this.afAuth.auth.createUserWithEmailAndPassword(value.emailOrPhone, value.password).then(
      (res) => {
        console.log(res)
        this.addUser(res, res.uid).then((res) => alert(res)),
          (error) => alert(error.message)
      }
    )
  }

  doRegisterWithPhone(value, appVerifier) {
    return from(this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier)).
    pipe(
      map((res) => {
        this.addUser(res, res.uid)
        return of(res)
      })
    )
    // map((res) => {return of(res)})


    // .switchMap((res) => {
    //   console.log(res)
    //   this.addUser(res, res.uid).then((res) => alert(res))
    //   return of(res);
    // });
  }

  addUser(user, uid) {
    console.log(user, uid);
    const toSend = this.db.object('/users/' + uid);
    return toSend.set({ name: 'usman' });
  }

  getUser(uid) {
    return this.db.object('/users/' + uid)
  }
}
