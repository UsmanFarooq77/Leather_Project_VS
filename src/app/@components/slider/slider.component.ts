import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { s } from "@angular/core/src/render3";
declare var $: any;
@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit {
  @ViewChild("slider_video") el: ElementRef;
  constructor() {}
  ngOnInit() {
    $(document).ready(function () {
      // $(".owl-carousel").owlCarousel({
      //   // loop:true,
      //   margin: 0,
      //   items: 1,
      //   // nav:true,
      //   // autoplay:true,
      //   // navText: ['<span class="icon-arrow_back"></span>', '<span class="icon-arrow_forward"> </span>'],
      //   animateOut: 'fadeOut',
      //   // smartSpeed:650,
      //   // autoplayTimeout:1000,
      //   // autoplayHoverPause:true
      // })
      $(".bxslider").bxSlider({
        mode: "fade",
        auto: true,
        pager: true,
        controls: false,
        pause: 6000,
        captions: true,
        autoControls: false,
        video: true,
      });
    });
  }
}
