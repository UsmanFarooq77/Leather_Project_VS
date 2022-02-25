import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './products/product/product.component';
import { RoomDetailsComponent } from './products/product-details/room-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
// import { IndexComponent } from '../admin/index/index.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewsComponent } from './reviews/reviews.component';
const routes: Routes = [
  // {path:'index', component:IndexComponent},
  { path: '', component: ProductComponent},
  { path: 'gallery/:pageNumber', component: GalleryComponent },
  { path: 'Products/:pageNumber', component:ProductComponent},
  { path: 'Products', component: ProductComponent },
  { path: 'product-detail/:category/:id', component: RoomDetailsComponent },
  { path: 'booking/:id', component: BookingFormComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reviews', component: ReviewsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }