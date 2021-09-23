import { bookings } from './../../models/booking-model';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  id: any;
  isAlertHide: boolean;
  public bookings = new bookings();
  totalOrders: number;
  autoGenerateId: string;
  constructor(private adservice: AdminserviceService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.totalOrders = 1;
    this.isAlertHide = null;
  }
  ngOnInit() {
    this.scrollToUp();
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
}
