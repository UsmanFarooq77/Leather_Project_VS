import { Product } from '../../interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  upComingProducts: Product[];
  config: SwiperConfigInterface;
  // slideOptions: {};
  // subcription: any;
  // isLoadingProductCategory: boolean;
  // searchText: string;

  constructor(private adminService: AdminserviceService) {
    // this.isLoadingProductCategory = true;
    // this.searchText = ""
  }

  ngOnInit() {
    // this.subcription = this.adminService.getPost().subscribe((upcoming) => {
    //   this.upComingProducts = upcoming;
    // });
    this.config = {
      slidesPerView: 3,
      centeredSlides: true,
      grabCursor: true,
      loop: true,
      autoplay: true,
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      breakpoints: {
        767: {
          slidesPerView: 1,
          centeredSlides: true,
          effect: 'slide',
        },
        991: {
          slidesPerView: 2,
          centeredSlides: false,
          effect: 'slide',
        }
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // keyboard: true,
      // mousewheel: true,
      // scrollbar: false,
      // direction: 'horizontal',
    };

  }
}
