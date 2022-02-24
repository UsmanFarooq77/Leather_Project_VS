import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { ReversePipe } from 'ngx-pipes';
import { Product } from '../../interfaces/Product';
declare var $: any;
// import * as $ from 'jquery';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [ReversePipe]
})
export class GalleryComponent implements OnInit {
  posts: Product[];
  isImageLoad: boolean;
  pageNumber: number;
  Categories$: Observable<any>;
  filteredCategories: Product[];
  category: string;
  isLoadingProductCategory: boolean;
  constructor(
    private adService: AdminserviceService,
    private reversePipe: ReversePipe,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    this.posts = [];
    this.filteredCategories = [];
    this.category = "";
    this.isLoadingProductCategory = true;
    this.pageNumber = 1;
    this.isImageLoad = true;
  }
  ngOnInit() {
    // this.pageNumber = Number(this.route.snapshot.paramMap.get('pageNumber') ? this.route.snapshot.paramMap.get('pageNumber') : 1);
    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })
    this.adService.getPost().subscribe((posts) => {
      if (posts) {
        this.posts = this.filteredCategories = posts;
        this.isImageLoad = false;
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('Category');
          // if (this.category) {
            this.reversePipe.transform(this.filteredCategories = (this.category) ?
              this.posts.filter(post => post.post_category === this.category) : this.posts);
            this.pageNumber = Number(this.route.snapshot.paramMap.get('pageNumber') ? this.route.snapshot.paramMap.get('pageNumber') : 1);
          // }
          // else {
          //   this.pageNumber = Number(this.route.snapshot.paramMap.get('pageNumber') ? this.route.snapshot.paramMap.get('pageNumber') : 1);
          // }
        });
        this.isLoadingProductCategory = false;
        this.scrollToTop();
      }
    });
    // $(document).ready(function(){
    //   $('[data-toggle="tooltip"]').tooltip();
    //   $('[data-toggle="tooltip"]').tooltip('disable',true);   
    // });
    this.Categories$ = this.adService.getCategories();
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  clearAllResult() {
    this.category = "";
    this.reInitComponent(1);
  }
  pageChanged(pageNumber: number) {
    this.reInitComponent(pageNumber);
  }
  reInitComponent(pageNumber?: number) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.scrollToTop();
    if (this.category) {
      this.router.navigate(['/gallery', pageNumber], { queryParams: { Category: this.category } });
    }
    else {
      this.router.navigate(['/gallery', pageNumber]);
    }
  }
}
