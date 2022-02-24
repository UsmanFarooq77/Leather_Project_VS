import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { MembershipModule } from '../@membership/membership.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { TopHeaderComponent } from './top-header/top-header.component';
const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MembershipModule,
    MaterialModule,
    RouterModule.forChild([])
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
