import { Subscription } from 'rxjs/Subscription';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import { Review } from '../../interfaces/review';
declare var $: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  reviews: Review[];
  subcription : Subscription;
  isReviewsLoading : boolean;
  constructor(private adminService: AdminserviceService) {
    this.reviews = [];
    this.isReviewsLoading  =  true;
  }

  ngOnInit() {
    this.subcription = this.adminService.getReviews().subscribe((review) => {
      this.reviews = review;
      this.isReviewsLoading = false;
      if (this.reviews.length) {
        $(document).ready(function () {
          var slider = $('#slider');
          $('.owl-carousel').owlCarousel({
            nav: false,
            loop: true,
            margin: 30,
            items: 4,
            autoplay: true,
            // navText: ['<span class="icon-arrow_back"></span>', '<span class="icon-arrow_forward"> </span>'],
            responsiveClass: true,
            responsive: {
              0: {
                items: 1,
                nav: false,
                loop: true,
              },
              600: {
                items: 1,
                nav: false,
                loop: true,
              },
              900: {
                items: 2,
                nav: false,
                loop: true,
              },

            }
          })
          $('.prev').on("click", function () {
            slider.trigger('prev.owl.carousel')
          });
          $('.next').on("click", function () {
            slider.trigger('next.owl.carousel')
          });

        });
      }
    });

  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

}
