import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable()
export class AuthService {
  User$: Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    // this.User$ = this.afAuth.authState;
    // this.afAuth.authState.subscribe();
  }
  // login(){
  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl',returnUrl);
  //   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  // }
  // logout(){
  //   this.afAuth.auth.signOut();  
  // }
}
