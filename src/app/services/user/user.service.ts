import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  user: User;

  public _currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
  public _currentUser: Observable<User>;


  constructor(private db: AngularFireDatabase) {
    this._currentUser = this._currentUserSubject.asObservable();
    this._currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
      (error) => { alert(error.message); }
    })
  }

  currentUser(): User {
    return this.user;
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

  getUserWithPhoneNumber(phoneNumber) {
    return this.db.object('/usersWithPhoneNumber/' + phoneNumber);
  }
  getAllUsers() {
    return this.db.list('/users/');
  }

  isUserExist(emailOrPhone) {
    const dbRef = this.db.database.ref(`/usersWithPhoneNumber/${emailOrPhone}`)
    return dbRef.once('value').
      then((snapshot) => {
        return snapshot.exists();
      });
  }

  userPasswordVerify(emailOrPhone, password) {
    const dbRef = this.db.database.ref(`/usersWithPhoneNumber/${emailOrPhone}`)
    return dbRef.once('value').
      then((snapshot) => {
        if (snapshot.exists()) {
          const currentUser = snapshot.val();
          if (currentUser.password === password) {
            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
      });
  }
}
