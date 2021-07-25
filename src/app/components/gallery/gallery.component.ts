import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
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
  Posts$: any;
  isImageLoad: boolean;
  @ViewChild('sampleCheque') public sample: ElementRef;
  pageNumber: number;
  constructor(private adService: AdminserviceService, private reversePipe: ReversePipe) {
    this.pageNumber = 0;
    this.isImageLoad = true;
  }
  ngOnInit() {
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    this.adService.getPost().subscribe((posts) => {
      if (posts) {
        this.Posts$ = posts;
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
}
