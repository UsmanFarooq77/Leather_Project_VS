
import { ReversePipe, NgPipesModule } from 'ngx-pipes';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

import { RoomDetailsComponent } from './products/product-details/room-details.component';
import { MaterialModule } from '../shared/material.module';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ProductRoutingModule,
    RouterModule,
    NgxPaginationModule,
    NgPipesModule
  ],
  declarations: [
    ProductComponent,
    RoomDetailsComponent,
    CommentsComponent
  ],
  exports: [
    ProductComponent,
    RoomDetailsComponent
  ],
  providers: [
    ReversePipe
  ]
})
export class ProductModule { }
