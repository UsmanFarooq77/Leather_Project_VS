import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase  from 'firebase'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
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
  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  signIn(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
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
