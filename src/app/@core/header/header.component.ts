import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { user } from '../../models/user-model';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Categories$: Observable<any>;
  user: string;
  currentUser: User;
  fullName: string;
  currentUserName: string;

  constructor(private adService: AdminserviceService,
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public loginService: LoginService) {
    this.user = "";
  }

  ngOnInit() {
    this.Categories$ = this.adService.getCategories();

    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    $(window).on("mouseenter mouseleave", function () {
      // if (this.matchMedia("(min-width: 768px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
      // } else {
      //   $dropdown.off("mouseenter mouseleave");
      // }
    });
    // this.authService.User$.subscribe((user) => {
    //   if (user) {
    //     this.user = user.uid;
    //   }
    //   else {
    //     this.user = '';
    //   }
    // });
    // console.log(localStorage.getItem())
    this.loginService.currentUser.subscribe((user) => {
      if (user)
      this.currentUser = user;
      else {
        this.currentUser = null;
      }
    })

  }

  login() {
    this.loginService.pushOpenLoginModal(true);
  }
  logout() {
    this.authService.logout();
  }
}
