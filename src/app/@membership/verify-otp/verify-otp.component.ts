import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  verificationCode: string;
  user: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  verifyOtpCode() {
    this.authService.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        console.log(result);
        this.user = result.user;
        if (this.user) alert('You have successfully created an account!');
      })
      .catch((error) => alert('Please enter correct otp code or code has been expired!.'));
  }

}
