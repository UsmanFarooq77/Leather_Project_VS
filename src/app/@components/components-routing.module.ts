import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

const routes: Routes = [
  { path: 'gallery/:pageNumber', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'booking/:id', component: BookingFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
