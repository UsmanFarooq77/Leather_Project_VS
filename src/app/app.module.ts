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
import { ComponentsModule } from './components/components.module';
import { AdminserviceService } from './services/admin/adminservice.service';
import { AuthService } from './services/auth/auth.service';
import { GuardsGuard } from './guards/guards.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { OwlModule } from 'ngx-owl-carousel';
@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    FooterComponent,
    PageNotFoundComponent
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
    OwlModule
  ],
  providers: [AdminserviceService, AuthService, GuardsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
