import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../services/admin/adminservice.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../../interfaces/Product';
import { Subscription } from 'rxjs/Subscription';
import { ReversePipe } from 'ngx-pipes';
declare var $: any;
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [ReversePipe]
})
export class RoomsComponent implements OnInit {
  Categories$: Observable<any>;
  Post: Product[] = [];
  FilteredCategories: Product[] = [];
  Category: string;
  subscription: Subscription;
  isLoadingRoomsCategory: boolean;
  dataNotFound: boolean;
  pageNumber: number;
  searchText: string;
  constructor(
    private adservice: AdminserviceService,
    private route: ActivatedRoute,
    public router: Router,
    public reversePipe: ReversePipe
  ) {
    this.isLoadingRoomsCategory = true;
    this.dataNotFound = false;
    this.pageNumber = 0;
    this.searchText = ""
  }

  ngOnInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.subscription = this.adservice.getPost().subscribe((posts) => {
      this.Post = this.FilteredCategories = posts;
      if (this.Post) {
        this.route.queryParamMap.subscribe(params => {
          this.Category = params.get('Category');
          if (this.Category) {
            this.reversePipe.transform(this.FilteredCategories = (this.Category) ?
              this.Post.filter(f => f.post_category === this.Category) : this.Post);
          }
        });
        this.isLoadingRoomsCategory = false;
      }
    });
    this.Categories$ = this.adservice.getCategories();
    // this.Categories$.subscribe((category) => {
    //   if (category) {
    //     // this.isLoadingRoomsCategory = false;
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
    this.Category = "";
    this.searchText = "";
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
