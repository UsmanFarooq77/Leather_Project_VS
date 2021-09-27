import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { ProductComponent } from './products/product/product.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { ContactComponent } from './contact/contact.component';
import { RoomDetailsComponent } from './products/product-details/room-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgPipesModule, ReversePipe } from 'ngx-pipes';
import { CommentsComponent } from './comments/comments.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MaterialModule } from '../shared/material.module';
@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgPipesModule,
    MaterialModule
  ],
  exports:
    [HeaderComponent,
      SliderComponent,
      ProductComponent,
      AboutComponent,
      GalleryComponent,
      MobileMenuComponent
    ],
  declarations:
    [HeaderComponent,
      SliderComponent,
      ProductComponent,
      AboutComponent,
      GalleryComponent,
      MobileMenuComponent,
      ContactComponent,
      RoomDetailsComponent,
      BookingFormComponent,
      CommentsComponent,
      ReviewsComponent
    ],
    providers: [ReversePipe]
})
export class ComponentsModule { }
