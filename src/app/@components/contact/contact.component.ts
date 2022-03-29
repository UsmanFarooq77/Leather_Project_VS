import { contacts } from '../../models/contact-model';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  isAlertHide: boolean;
  public contact = new contacts();
  autoGenerateId: string;
  currentUser: User;

  constructor(private adservice:AdminserviceService,
    private userService: UserService ) {
    this.isAlertHide = null;
   }
  ngOnInit() {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
    if (this.userService.currentUser()) {
      this.currentUser = this.userService.currentUser();
      this.contact.fullname = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      if (this.currentUser.emailOrPhone.includes('@')) return this.contact.email = this.currentUser.emailOrPhone;
      this.contact.phone = this.currentUser.emailOrPhone;
    }
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
  checkOnlyNumbers(value: KeyboardEvent) {
    return (value.key.charCodeAt(0) >= 48 && value.key.charCodeAt(0) <= 57);
  }
}
