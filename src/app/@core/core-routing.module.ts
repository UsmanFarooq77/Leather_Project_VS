import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreComponent } from './core/core.component';
import { HomeComponent } from '../@components/home/home.component';
import { LoginModelComponent } from '../@membership/login-model/login-model.component';
import { AboutComponent } from '../@components/about/about.component';
import { BookingFormComponent } from '../@components/booking-form/booking-form.component';
import { ContactComponent } from '../@components/contact/contact.component';
import { GalleryComponent } from '../@components/gallery/gallery.component';
import { ReviewsComponent } from '../@components/reviews/reviews.component';
import { ProductDetailsComponent } from '../@product/products/product-details/product-details.component';
import { ProductComponent } from '../@product/products/product/product.component';

const routes: Routes = [
  {
    path: '', component: CoreComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:pageNumber', component: ProductComponent },
      { path: 'products', component: ProductComponent },
      { path: 'product-detail/:category/:id', component: ProductDetailsComponent },
      { path: 'gallery/:pageNumber', component: GalleryComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'booking/:id', component: BookingFormComponent },
    ]
  },
  { path: 'login', component: LoginModelComponent },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class CoreRoutingModule { }
