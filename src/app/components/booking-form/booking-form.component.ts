import { bookings } from './../../models/booking-model';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/adminservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  id;
  Hidden: boolean;
  public bookings = new bookings();
  totalOrders: number;
  constructor(private adservice:AdminserviceService, private route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.totalOrders = 1;
   }
  ngOnInit() {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }
  booking(booking:NgForm){
    if(confirm("Are You Sure To Add Booking?")){
      this.bookings.number_of_orders = this.totalOrders;
      this.bookings.user_id = this.id;
      this.adservice.addBooking(this.bookings);
       this.Hidden=true;
       booking.resetForm();
       this.totalOrders = 1;
       this.scrollToUp();
      }
      else{
       this.Hidden=false;
      }
  }
  subtractCart(){
    if(this.totalOrders > 1){
    this.totalOrders-=1;
    }
  }
  addCart(){
    this.totalOrders+=1;
  }
  scrollToUp(){
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  }
}
