import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {


    this.userRole = this.authService.loggedUser.role;
   

    this.authService.Logged.subscribe((data:boolean)=>{

      if(data){
        this.userRole = this.authService.loggedUser.role;
      }else{
        this.userRole = "";
      }
      // this.router.navigate(['auth/login']);

    })
  }




  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
