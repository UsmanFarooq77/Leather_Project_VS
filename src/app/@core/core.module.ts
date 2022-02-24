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


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreRoutingModule,
    MembershipModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TopHeaderComponent,
    PageNotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TopHeaderComponent
  ]
})
export class CoreModule { }
