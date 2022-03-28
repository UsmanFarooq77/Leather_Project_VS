import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      if ($('#date-countdown').length > 0) {
        $('#date-countdown').countdown('2022/8/8', function (event) {
          var $this = $(this).html(event.strftime(''
            + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
            + '<span class="countdown-block"><span class="label">%d</span> days </span>'
            + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
            + '<span class="countdown-block"><span class="label">%M</span> min </span>'
            + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
        });
      }
    })
  }

}
