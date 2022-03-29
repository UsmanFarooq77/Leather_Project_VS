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
import { RecaptchaService } from '../services/reCAPTCHA/recaptcha.service';
import { TypingAnimationModule } from 'angular-typing-animation';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    OwlModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    TypingAnimationModule
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
    SliderComponent,
    TypingAnimationModule
  ],
  declarations: [
    SliderComponent
  ],
  providers: [
    ReversePipe,
    LoginService,
    UserService,
    RecaptchaService
  ]
})
export class SharedModule { }
