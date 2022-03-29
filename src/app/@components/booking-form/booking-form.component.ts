import { User } from './../../interfaces/user';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../interfaces/Product';
import { bookings } from '../../models/booking-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit, OnDestroy {
  id: any;
  isAlertHide: boolean;
  totalOrders: number;
  autoGenerateId: string;
  filteredPosts: Product[];
  subcription: Subscription;
  userSubcription: Subscription;
  currentUser: User;

  public bookings = new bookings();

  constructor(private adservice: AdminserviceService,
    private route: ActivatedRoute,
    private loginService: LoginService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.totalOrders = 1;
    this.isAlertHide = null;
    this.filteredPosts = [];
  }

  ngOnInit() {
    this.scrollToUp();
    this.subcription = this.adservice.getPost().subscribe((posts) => this.filteredPosts = posts.filter((post) => post.$key == this.id));
    this.userSubcription = this.loginService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.bookings.user_firstname = this.currentUser.firstName;
        this.bookings.user_lastname = this.currentUser.lastName;
        if (this.currentUser.emailOrPhone.includes('@')) return this.bookings.user_email = this.currentUser.emailOrPhone;
        this.bookings.user_phone = this.currentUser.emailOrPhone;
      }
      (error) => { alert(error.message); }
    })
  }

  booking(booking: NgForm) {
    if (confirm("Are You Sure To Add Booking?")) {
      this.bookings.number_of_orders = this.totalOrders;
      this.bookings.user_id = this.id;
      this.autoGenerateId = this.adservice.addBooking(this.bookings);
      // this.isAlertHide = true;
      if (this.autoGenerateId) {
        this.isAlertHide = true;
      }
      else {
        this.isAlertHide = false;
      }
      booking.resetForm();
      this.totalOrders = 1;
      this.scrollToUp();
    }
    else {
      this.isAlertHide = false;
      this.scrollToUp();
    }
  }

  closeAlert(): void {
    this.isAlertHide = null;
  }
  subtractCart() {
    if (this.totalOrders > 1) {
      this.totalOrders -= 1;
    }
  }
  addCart() {
    this.totalOrders += 1;
  }
  scrollToUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  checkOnlyNumbers(value: KeyboardEvent) {
    return (value.key.charCodeAt(0) >= 48 && value.key.charCodeAt(0) <= 57);
  }
  ngOnDestroy(): void {
    if(this.userSubcription) this.userSubcription.unsubscribe();
  }
}
