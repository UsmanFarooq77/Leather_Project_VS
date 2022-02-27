import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.css']
})
export class MainModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#exampleModalCenter').modal('show');
    });
  }
  

}
