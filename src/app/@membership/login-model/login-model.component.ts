import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { AuthService } from '../../services/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.css']
})
export class LoginModelComponent implements OnInit {

  isLoginLoading: boolean;
  userName: void;
  isAdmin: boolean;
  admin: firebase.User;
  isGoogleLogin: boolean;
  isFacebookLogin: boolean;

  constructor(private adService : AdminserviceService,
    public router: Router, public authService: AuthService) {
    this.isLoginLoading = false;
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
   }

  ngOnInit() {
    if (localStorage.getItem('google')) {
      this.isGoogleLogin = true;
    }
    if (localStorage.getItem('facebook')) {
      this.isFacebookLogin = true;
    }
    $(document).ready(function () {
      $('#loginModalCenter').modal('show');
    });
    this.authService.User$.subscribe(admin => {
      if (admin) {
        this.admin = admin;
        this.isAdmin = true;
        // let returnUrl = localStorage.getItem('returnUrl');
        // this.router.navigateByUrl(returnUrl);
        this.hideModel();
        this.router.navigate(['/dashboard']);
      }
      else {
        this.isAdmin = false;
        this.isGoogleLogin = false;
        this.isFacebookLogin = false;
        localStorage.clear();
      }
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  
  }
  socialLogin(value : string) {
    if (value === 'google') {
      this.isGoogleLogin = true;
      localStorage.setItem('google', value);
    }
    else {
      this.isFacebookLogin = true;
      localStorage.setItem('facebook', value);
    }
    this.authService.login(value);
    // if (this.userName != null || this.userName != undefined) {
    //   this.isLoginLoading = false;
    // }
  }
  hideModel(){
    $(document).ready(function () {
      $('#loginModalCenter').modal('hide');
    });
  }
  logout() {
    this.isGoogleLogin = false;
    this.isFacebookLogin = false;
    this.isAdmin = false;
    this.authService.logout();
  }


}
