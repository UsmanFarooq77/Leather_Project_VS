import { ProductModule } from './../@product/product.module';
import { ComponentsModule } from './../@components/components.module';

import { CoreRoutingModule } from './core-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { MembershipModule } from '../@membership/membership.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { HomeComponent } from './home/home.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CoreComponent } from './core/core.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreRoutingModule,
    MembershipModule,
    MaterialModule,
    ProductModule,
    ComponentsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TopHeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    CoreComponent
  ],
  exports: [
    // HeaderComponent,
    // FooterComponent,
    // TopHeaderComponent
  ]
})
export class CoreModule { }
