import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase  from 'firebase'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs/observable/from';

@Injectable()
export class AuthService {
  User$: Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth, private router:Router, private route:ActivatedRoute ) { 
    this.User$ = this.afAuth.authState;
    // this.afAuth.authState.subscribe();
  }
  login(value){
    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl',returnUrl);
    if(value === 'google'){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
    else{
      this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    }
  }

  doRegisterWithEmail(value){
    // return new Promise<any>((resolve, reject) => {
    //   firebase.auth().createUserWithEmailAndPassword(value.emailOrPhone, value.password)
    //   .then(res => {
    //     console.log(res);
    //     resolve(res);
    //   }, err => reject(err))
    // })
    this.afAuth.auth.createUserWithEmailAndPassword(value.emailOrPhone, value.password).then(
      (res) => console.log(res)
    )
    // this.afAuth.auth.signInWithPhoneNumber
  }

  doRegisterWithPhone(value, appVerifier){
    return from(this.afAuth.auth.signInWithPhoneNumber(value.emailOrPhone, appVerifier))
    // firebase.auth().signInWithPhoneNumber(value.emailOrPhone, appVerifier)
    // .then(result => {
    //   console.log(result)
    //   // this.windowRef.confirmationResult = result;

    // })
    // .catch(error => console.log(error));
  }

  signIn(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.emailOrPhone, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  
  logout(){
    localStorage.clear();
    this.afAuth.auth.signOut(); 
  }
}
