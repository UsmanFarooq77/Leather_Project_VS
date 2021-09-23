import { contacts } from './../../models/contact-model';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isAlertHide: boolean;
  public contact = new contacts();
  autoGenerateId: string;
  constructor(private adservice:AdminserviceService) {
    this.isAlertHide = null;
   }
  ngOnInit() {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }
  addContact(contact:NgForm){
    if(confirm("Are You Sure To Contacting Us?")){
      this.autoGenerateId = this.adservice.addContact(this.contact);
      if (this.autoGenerateId) {
        this.isAlertHide = true;
      }
      else {
        this.isAlertHide = false;
      }
       contact.resetForm();
       this.scrollToUp();
      }
      else{
       this.isAlertHide=false;
       this.scrollToUp();
      }
   }
   closeAlert(): void {
    this.isAlertHide = null;
  }
  scrollToUp(){
    window.scrollTo({
      top:500,
      behavior: 'smooth'
    });
  }
}
