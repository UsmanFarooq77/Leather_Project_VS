import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  // EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  EMAILORPHONE_REGEXP = /^(?:\d{11}|\+[1-9]{1}[0-9]{3,14}|\w+@\w+\.\w{2,3})$/i;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public loginService: LoginService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["usman", [Validators.required, Validators.minLength(3)]],
      lastName: ["ali", [Validators.required, Validators.minLength(3)]],
      emailOrPhone: [
        "+923456572721",
        [Validators.required, Validators.pattern(this.EMAILORPHONE_REGEXP)],
      ],
      password: ["123456", Validators.required],
    });
  }

  signUp(value) {
    this.authService.signUp(value);
  }

}
