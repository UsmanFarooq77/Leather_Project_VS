import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  isOpenLoginModal: boolean;

  constructor(private loginService: LoginService,
    private router: Router,
    private authService: AuthService) {
    this.isOpenLoginModal = false;
  }

  ngOnInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // this.authService.User$.subscribe(user => {
    //   if (user){
    //     let returnUrl = localStorage.getItem('returnUrl');
    //     this.router.navigateByUrl(returnUrl);
    //   }
    // })
    this.loginService.pullOpenLoginModal()
      .subscribe((value: boolean) => {
        this.isOpenLoginModal = value ? true : false;
      })
  }

}
