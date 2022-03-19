import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

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
