import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupChatDialogComponent } from '../chat/group-chat-dialog/group-chat-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router,public dialog: MatDialog) {


    this.userRole = this.authService.loggedUser.role;
   

    this.authService.Logged.subscribe((data:boolean)=>{

      if(data){
        this.userRole = this.authService.loggedUser.role;
      }else{
        this.userRole = "";
      }
     

    })
  }




  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  profile(){
    this.router.navigateByUrl('auth/profile');
  }

  chat(){
       this.dialog.open(GroupChatDialogComponent,{
          width: '600px',
          height: '650px',
          panelClass: 'custom-modalbox'
        });
  }
}
