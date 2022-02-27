import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor() { }

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
  }

}
