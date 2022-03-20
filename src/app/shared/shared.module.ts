import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule, ReversePipe } from 'ngx-pipes';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SliderComponent } from './slider/slider.component';
import { LoginService } from '../services/login/login.service';
import { UserService } from '../services/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    OwlModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    OwlModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    SliderComponent
  ],
  declarations: [
    SliderComponent
  ],
  providers: [
    ReversePipe,
    LoginService,
    UserService
  ]
})
export class SharedModule { }
