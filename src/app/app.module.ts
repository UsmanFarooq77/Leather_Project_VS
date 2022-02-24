import { CoreModule } from './@core/core.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgPipesModule } from 'ngx-pipes';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ComponentsModule } from './@components/components.module';
import { AdminserviceService } from './services/admin/adminservice.service';
import { AuthService } from './services/auth/auth.service';
import { GuardsGuard } from './guards/guards.guard';
import { OwlModule } from 'ngx-owl-carousel';
import { OfferComponent } from './@components/offer/offer.component';
import { UpcomingComponent } from './@components/upcoming/upcoming.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';


@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    UpcomingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    OwlModule,
    SwiperModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule
  ],
  providers: [AdminserviceService, AuthService, GuardsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
