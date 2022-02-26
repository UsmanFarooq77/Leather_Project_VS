import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailsComponent } from './products/product-details/room-details.component';
import { ProductComponent } from './products/product/product.component';

const routes: Routes = [
  { path: '', component: ProductComponent},
  { path: 'Products/:pageNumber', component:ProductComponent},
  { path: 'Products', component: ProductComponent },
  { path: 'product-detail/:category/:id', component: RoomDetailsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ProductRoutingModule { }
