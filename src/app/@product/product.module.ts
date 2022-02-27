
import { ReversePipe } from 'ngx-pipes';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';

import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { MaterialModule } from '../shared/material.module';
import { CommentsComponent } from './comments/comments.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    MaterialModule,
    SharedModule,
    ProductRoutingModule,
    RouterModule,
  ],
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    CommentsComponent
  ],
  exports: [
    ProductComponent,
    ProductDetailsComponent
  ],
  providers: [
    ReversePipe
  ]
})
export class ProductModule { }
