import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { SwiperModule } from 'ngx-swiper-wrapper';

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
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgPipesModule,
    OwlModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: []
})
export class SharedModule { }
