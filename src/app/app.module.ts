import { environment } from './../environments/environment';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './@core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AdminserviceService } from './services/admin/adminservice.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MainModalComponent } from './main-modal/main-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [AdminserviceService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
