import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @ViewChild('carousel') el: ElementRef;
  constructor() { }
  ngOnInit() {
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
        // loop:true,
        margin: 0,
        items: 1,
        // nav:true,
        // autoplay:true,
        // navText: ['<span class="icon-arrow_back"></span>', '<span class="icon-arrow_forward"> </span>'],
        animateOut: 'fadeOut',
        // smartSpeed:650,
        // autoplayTimeout:1000,
        // autoplayHoverPause:true
      })
    }
    )
  }
}
