import { SharedModule } from './../shared/shared.module';
import { ComponentsModule } from './../@components/components.module';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from './../shared/material.module';
import { MembershipModule } from '../@membership/membership.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { CoreComponent } from './core/core.component';


@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule,
    MembershipModule,
    MaterialModule,
    ComponentsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TopHeaderComponent,
    CoreComponent
  ],
  exports: []
})
export class CoreModule { }
