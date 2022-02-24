import { Subscription } from 'rxjs/Subscription';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { Review } from '../../interfaces/review';
declare var $: any;
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  reviews: Review[];
  subcription: Subscription;
  isReviewsLoading: boolean;
  slideOptions: {};
  constructor(private adminService: AdminserviceService) {
    this.reviews = [];
    this.isReviewsLoading = true;
  }

  ngOnInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.subcription = this.adminService.getReviews().subscribe((review) => {
      this.reviews = review;
      this.isReviewsLoading = false;
      if (this.reviews.length) {

      }
    });
    this.slideOptions = {
      items: 1,
      dots: true,
      loop: true,
      autoplay: true,
      smartSpeed: 1000
    };
    // CarouselOptions = { items: 3, dots: true, nav: true };
    // $(document).ready(function () {
    //   var slider = $('#slider');
    //   $('.owl-carousel').owlCarousel({
    //     nav: true,
    //     loop: true,
    //     margin: 28,
    //     items: 4,
    //     autoplay: true,
    //     smartSpeed: 1000,
    //     // navText: ['<span class="icon-arrow_back"></span>', '<span class="icon-arrow_forward"> </span>'],
    //     responsiveClass: true,
    //     responsive: {
    //       0: {
    //         items: 1,
    //         nav: false
    //       },
    //       600: {
    //         items: 2,
    //         nav: false
    //       },
    //       1024: {
    //         items: 3,
    //         nav: false
    //       },
    //       1140: {

    //       }
    //     }
    //   })
    //   $('.prev').on("click", function () {
    //     slider.trigger('prev.owl.carousel')
    //   });
    //   $('.next').on("click", function () {
    //     slider.trigger('next.owl.carousel')
    //   });

    // });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
