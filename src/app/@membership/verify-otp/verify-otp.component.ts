import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  verificationCode: string;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  verifyOtpCode() {
    this.loginService.verifyOtpCode(this.verificationCode)
  }
}
