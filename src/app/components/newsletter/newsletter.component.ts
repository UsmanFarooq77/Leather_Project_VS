
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { newsLetterModel } from '../../models/newsletter-model';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  autoGenerateId: string;
  isAlertHide: boolean;
  public newsLetterModel = new newsLetterModel();
  constructor(private _adminService: AdminserviceService) {
    this.autoGenerateId = "";
    this.isAlertHide = null;
  }

  ngOnInit() {
  }
  addNewsLetterForm(newsLetter: NgForm) {
    this.newsLetterModel = newsLetter.value;
    if (confirm("Are You Sure To Subscribe Us?")) {
      this.autoGenerateId = this._adminService.addNewsLetter(this.newsLetterModel);
      if (this.autoGenerateId) {
        this.isAlertHide = true;
        alert("Thank You!")
      }
      else {
        this.isAlertHide = false;
      }
      newsLetter.resetForm();
    }
    else {
      this.isAlertHide = false;
    }
  }

}
