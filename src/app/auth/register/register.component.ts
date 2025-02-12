import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiCall } from '../services/apiCall.service';
import { User2 } from 'src/app/models/User2';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  apiCall:ApiCall=inject(ApiCall)
  user!:User2;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.valid) {

      this.user={
        firstname:this.registerForm.value.firstName,
        lastname:this.registerForm.value.lastName,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        gender:this.registerForm.value.gender
      }

      this.apiCall.register(this.user,this.registerForm.value.role).subscribe(()=>{
        this._snackBar.open("Registered successfully");
        setTimeout(() => {
          this._snackBar.dismiss()
        }, 1500)
        this.router.navigate(['/auth/login']);
      },(error)=>{

        this._snackBar.open("Email ready exists");
        setTimeout(() => {
          this._snackBar.dismiss()
        }, 1500)
      })


   
      this.registerForm.reset();
      this.registerForm.markAsPristine();
      this.registerForm.markAsUntouched();
      
    } else {
      this._snackBar.open("Please fill in all required fields");
      setTimeout(() => {
        this._snackBar.dismiss()
      }, 1500)
    }
  }
}