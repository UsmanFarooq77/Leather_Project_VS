import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RoomsComponent } from './products/product/rooms.component';
import { RoomDetailsComponent } from './products/product-details/room-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
// import { IndexComponent } from '../admin/index/index.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewsComponent } from './reviews/reviews.component';
const routes: Routes = [
  // {path:'index', component:IndexComponent},
  { path: '', component: RoomsComponent},
  { path: 'gallery/:pageNumber', component: GalleryComponent },
  { path: 'Products/:pageNumber', component:RoomsComponent},
  { path: 'Products', component: RoomsComponent },
  { path: 'product-detail/:category/:id', component: RoomDetailsComponent },
  { path: 'booking/:id', component: BookingFormComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
