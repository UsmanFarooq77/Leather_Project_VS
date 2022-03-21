import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

import { TypingAnimationModule } from "angular-typing-animation";

@NgModule({
  imports: [
    CommonModule,
    TypingAnimationModule,
    OrdersRoutingModule
  ],
  declarations: [
    MyOrdersComponent
  ],
  exports: []
})
export class OrdersModule { }
