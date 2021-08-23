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
  Hidden: boolean;
  public contact = new contacts();
  constructor(private adservice:AdminserviceService) {
   }
  ngOnInit() {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }
  addContact(contact:NgForm){
    if(confirm("Are You Sure To Contacting Us?")){
      this.adservice.addContact(this.contact);
       this.Hidden=true;
       contact.resetForm();
       window.scrollTo({
        top:500,
        behavior: 'smooth'
      });
      }
      else{
       this.Hidden=false;
      }
   }
}
