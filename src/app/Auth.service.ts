import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: string = '';

  login(role: string) {
    this.isAuthenticated = true;
    this.userRole = role;
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('role', role);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
}
