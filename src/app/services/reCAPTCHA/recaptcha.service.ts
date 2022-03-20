import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RecaptchaService {

  reCAPTCHAVerified: boolean;
  public _isreCAPTCHAShowSubject = new BehaviorSubject(true);
  public _isreCAPTCHAShow: Observable<boolean>;

  constructor() {
    this.reCAPTCHAVerified = false;
    this._isreCAPTCHAShow = this._isreCAPTCHAShowSubject.asObservable();
   }

   reCAPTCHAVerifiedMessage() {
    alert("Are you a human being? Please check the box I'm not a robot.");
  }

}
