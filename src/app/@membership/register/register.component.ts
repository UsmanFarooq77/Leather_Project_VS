import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  // EMAIL_REGEXP = /^[^@]+@([^@\.]+\.)+[^@\.]+$/i;
  EMAILORPHONE_REGEXP = /^(?:\d{11}|\+[1-9]{1}[0-9]{3,14}|\w+@\w+\.\w{2,3})$/i;
  isSignedIn: boolean;

  constructor(
    private formBuilder: FormBuilder) {
    this.isSignedIn = false;
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
    // if (this.reCAPTCHAVerified == false) alert("Are you a human being? Please check the box I'm not a robot.");
    console.log(value);

    // .then(res => {
    //   this.errorMessage = "";
    //   this.successMessage = "Your account has been created";
    // }, err => {
    //   this.errorMessage = err.message;
    //   this.successMessage = "";
    // })
  }

}
