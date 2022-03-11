import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModelComponent } from './login-model/login-model.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
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
