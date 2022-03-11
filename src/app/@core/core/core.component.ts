import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
declare var $: any;

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  isOpenLoginModal: boolean;

  constructor(private loginService: LoginService) {
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
        console.log(value);
        this.isOpenLoginModal = value ? true : false;
      })
  }

}
