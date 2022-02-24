import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { AuthService } from '../../services/auth/auth.service';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Categories$: Observable<any>;

  

  constructor(private adService : AdminserviceService,
    public router: Router, public authService: AuthService) {
    
  }
  ngOnInit() {
    this.Categories$ = this.adService.getCategories();
    
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    $(window).on("mouseenter mouseleave", function() {
      // if (this.matchMedia("(min-width: 768px)").matches) {
        $dropdown.hover(
          function() {
            const $this = $(this);
            $this.addClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "true");
            $this.find($dropdownMenu).addClass(showClass);
          },
          function() {
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
   
      
      
  }

  initializePopUp(){
    $(document).ready(function () {
      $('#loginModalCenter').modal('show');
    });
    alert('Please enter Email and Password.');
  }
  
  
}
