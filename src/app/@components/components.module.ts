import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ReversePipe } from 'ngx-pipes';

import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { ContactComponent } from './contact/contact.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { OfferComponent } from './offer/offer.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProductModule } from '../@product/product.module';


@NgModule({
  imports: [
    MaterialModule,
    SharedModule,
    ProductModule,
    ComponentsRoutingModule,
  ],
  declarations:
    [
      HomeComponent,
      AboutComponent,
      GalleryComponent,
      MobileMenuComponent,
      ContactComponent,
      BookingFormComponent,
      ReviewsComponent,
      OfferComponent,
      UpcomingComponent
    ],
    exports:
    [],
  providers: [ReversePipe]
})
export class ComponentsModule { }
