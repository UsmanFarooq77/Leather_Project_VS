import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminserviceService } from '../../../services/admin/adminservice.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../../interfaces/Product';
import { Subscription } from 'rxjs/Subscription';
import { ReversePipe } from 'ngx-pipes';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  Categories$: Observable<any>;
  posts: Product[];
  filteredCategories: Product[];
  category: string;
  subscription: Subscription;
  isLoadingProductCategory: boolean;
  dataNotFound: boolean;
  pageNumber: number;
  searchText: string;
  @ViewChild('scroll') scroll: ElementRef;
  constructor(
    private adservice: AdminserviceService,
    private route: ActivatedRoute,
    public router: Router,
    public reversePipe: ReversePipe
  ) {
    this.posts = [];
    this.filteredCategories = [];
    this.category = "";
    this.isLoadingProductCategory = true;
    this.dataNotFound = false;
    this.pageNumber = 1;
    this.searchText = ""
  }

  ngOnInit() {
    if (this.router.url == '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    else {
      let element = this.scroll.nativeElement as HTMLElement;
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }, 1000);
    }
    this.subscription = this.adservice.getPost().subscribe((posts) => {
      this.posts = this.filteredCategories = posts;
      if (this.posts) {
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('Category');
          if (this.category) {
            this.reversePipe.transform(this.filteredCategories = (this.category) ?
              this.posts.filter(post => post.post_category === this.category) : this.posts);
            this.pageNumber = Number(params.get('pageNumber')) ? Number(params.get('pageNumber')) : 1;
          }
          else {
            this.pageNumber = Number(this.route.snapshot.paramMap.get('pageNumber') ? this.route.snapshot.paramMap.get('pageNumber') : 1);
          }
        });
        this.isLoadingProductCategory = false;
      }
    });
    this.Categories$ = this.adservice.getCategories();
    // this.Categories$.subscribe((category) => {
    //   if (category) {
    //     // this.isLoadingProductCategory = false;
    //   }
    // });
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  clearSearchText() {
    this.searchText = "";
  }
  clearAllResult() {
    this.category = "";
    this.searchText = "";
    this.router.navigate(['/']);
  }
  pageChanged(pageNumber: number) {
    this.reInitComponent(pageNumber);
  }
  reInitComponent(pageNumber: number) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (this.category) {
      this.router.navigate(['/Products'], { queryParams: { Category: this.category, pageNumber } });
    }
    else {
      this.router.navigate(['/Products', pageNumber]);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
