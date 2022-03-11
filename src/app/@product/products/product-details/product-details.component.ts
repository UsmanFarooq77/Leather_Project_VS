import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../interfaces/Product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../../../services/admin/adminservice.service';
import { NgForm } from '@angular/forms';
import { ReversePipe } from 'ngx-pipes';
import { comments } from '../../../models/comment-model';
import { product } from '../../../models/product-model';
declare var $: any;

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
  providers: [ReversePipe],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: string;
  Post$: Product;
  IdLower: string;
  unapproved: string = "unapproved";
  comment_date: Date = new Date();
  public comment = new comments();
  category: string;
  filteredPostsByCategory: Product[];
  postIdSubscription: Subscription;
  postsSubscription: Subscription;
  stars: number[];


  constructor(
    private route: ActivatedRoute,
    private adservice: AdminserviceService,
    public reversePipe: ReversePipe,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.category = this.route.snapshot.paramMap.get("category");
    this.IdLower = this.id.substr(0, this.id.length);
    this.filteredPostsByCategory = [];
    this.stars = [];
  }
  ngOnInit() {
    this.stars.length = 5;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.postIdSubscription = this.adservice.getIdObject(this.id).subscribe((post) => {
      this.Post$ = post
    });
    this.postsSubscription = this.adservice.getPost().subscribe((posts) => {
      this.filteredPostsByCategory = posts.filter((post) => this.category == post.post_category && this.id !== post.$key);

      if (this.filteredPostsByCategory.length) {
        $(document).ready(function () {
          var owl = $("#slider");
          var image = $("#imageRelatedPost");
          $('.owl-carousel').owlCarousel({
            nav: false,
            loop: true,
            margin: 28,
            items: 4,
            autoplay: true,
            smartSpeed: 1000,
            // navText: ['<span class="icon-arrow_back"></span>', '<span class="icon-arrow_forward"> </span>'],
            responsiveClass: true,
            responsive: {
              0: {
                items: 1,
                nav: false
              },
              600: {
                items: 2,
                nav: false
              },
              1080: {
                items: 3,
                nav: false
              },
              1439: {

              }
            }
          })
          $(".prev").click(function () {
            owl.trigger('prev.owl.carousel');
          })
          $(".next").click(function () {
            owl.trigger('next.owl.carousel');
          })
        })
      }
    });
  }
  relatedPostDetails(key: any) {
    this.reInitComponent(key);
  }
  reInitComponent(key: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/product-detail', this.Post$.post_category, key]);
  }
  ngOnDestroy() {
    // this.postIdSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }
}
