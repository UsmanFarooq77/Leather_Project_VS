import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModelComponent } from './login-model/login-model.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    LoginModelComponent
  ],
  exports: [
    LoginComponent,
    LoginModelComponent
  ]
})
export class MembershipModule { }
