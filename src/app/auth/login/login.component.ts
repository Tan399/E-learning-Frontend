import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiCall } from '../services/apiCall.service';
import { res } from 'src/app/models/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  role: string = '';
  token: string = '';
  id:number=0;
  apicall: ApiCall = inject(ApiCall);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, 1500)
  }

  onLogin() {
    if (this.loginForm.valid) {
   
      this.apicall.logginToServer(this.loginForm.get('email')!.value, this.loginForm.get('password')!.value).subscribe((data: res) => {
        this.role = data.role;
        this.token = data.token;
        this.id=data.id;
        this.authService.login(this.role, this.token,this.id);
        this.openSnackBar("Logged in successfully!!");
        this.router.navigate([this.role === 'USER' ? '/user/home' : '/instructor/manage-courses']);
      }, (error) => {
  
        if( error.status === 403){
          this.openSnackBar("Invalid credentials");
        }else{
          this.openSnackBar("Something went wrong. Please try again.");
        }
       
      
      });

    }
  }
}