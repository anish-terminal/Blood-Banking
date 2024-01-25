import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  user = new User();
  msg = '';
  
  showPassword: boolean = false;
  showConfirmPassword:boolean = false;


  constructor(private _service: RegistrationService, private _router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  ngOnInit(): void { }

  registerUser() {
    this._service.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log("Registration Success");
        sessionStorage.setItem("USER", this.user.username); // Use sessionStorage consistently
        this._router.navigate(['/registrationsuccess']);
      },
      error => {
        console.log("Registration Failed");
        console.error(error);  // Log the entire error object for debugging
        if (error.error && error.error.message) {
          this.msg = error.error.message;  // Display a specific error message if available
        } else {
          this.msg = "User registration failed. Please try again.";  // Generic error message
        }
      }
    );
  }


  

}



