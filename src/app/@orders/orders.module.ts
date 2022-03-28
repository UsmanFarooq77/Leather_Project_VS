import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [
    MyOrdersComponent
  ],
  exports: []
})
export class OrdersModule { }
