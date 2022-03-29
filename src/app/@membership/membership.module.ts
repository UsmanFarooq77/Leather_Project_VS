import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RegisterComponent } from './register/register.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { LoginModelComponent } from './login-model/login-model.component';
import { LoginComponent } from './login/login.component';
import { MembershipRoutingModule } from './membership-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MembershipRoutingModule
  ],
  declarations: [
    LoginComponent,
    LoginModelComponent,
    RegisterComponent,
    RecaptchaComponent,
    VerifyOtpComponent
  ],
  exports: [
    LoginComponent,
    LoginModelComponent
  ]
})
export class MembershipModule { }
