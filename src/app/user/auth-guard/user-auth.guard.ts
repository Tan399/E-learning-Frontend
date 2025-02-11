import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
_snackBar:MatSnackBar=inject(MatSnackBar);
  canActivate(): boolean {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }
    
    this._snackBar.open("Access Denied. Please log in as a User.");
    setTimeout(()=>{
      this._snackBar.dismiss()
    },1500)
    this.router.navigate(['/login']);
    return false;
  }
}
