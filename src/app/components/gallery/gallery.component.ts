import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { ReversePipe } from 'ngx-pipes';
declare var $: any;
// import * as $ from 'jquery';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [ReversePipe]
})
export class GalleryComponent implements OnInit {
  posts: any;
  isImageLoad: boolean;
  @ViewChild('sampleCheque') public sample: ElementRef;
  pageNumber: number;
  constructor(
    private adService: AdminserviceService,
    private reversePipe: ReversePipe,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    this.posts = [];
    this.pageNumber = 1;
    this.isImageLoad = true;
  }
  ngOnInit() {
    this.pageNumber = Number(this.route.snapshot.paramMap.get('pageNumber') ? this.route.snapshot.paramMap.get('pageNumber') : 1);
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    this.adService.getPost().subscribe((posts) => {
      if (posts) {
        this.posts = posts;
        this.isImageLoad = false;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
    // $(document).ready(function(){
    //   $('[data-toggle="tooltip"]').tooltip();
    //   $('[data-toggle="tooltip"]').tooltip('disable',true);   
    // });
  }
  pageChanged(pageNumber: number) {
    this.reInitComponent(pageNumber);
  }
  reInitComponent(pageNumber: number) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/gallery', pageNumber])
  }
}
