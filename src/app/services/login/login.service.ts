import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {

  public _openLoginModal = new BehaviorSubject(false);

  constructor() {
    
   }
   public pushOpenLoginModal(value: boolean){
    this._openLoginModal.next(value);
   }
   public pullOpenLoginModal(): Observable<boolean>{
     return this._openLoginModal.asObservable();
   }
}
