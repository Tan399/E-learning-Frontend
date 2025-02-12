import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isInstructorAuthenticated()) {
      return true;
    }
    alert('Access Denied. Please log in as an Instructor.');
    this.router.navigate(['/login']);
    return false;
  }
}
