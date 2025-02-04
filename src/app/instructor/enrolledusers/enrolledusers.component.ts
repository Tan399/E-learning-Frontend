
  import { Component, inject, OnInit, ViewChild } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';



interface EnrolledUser {
  username: string;
  courseName: string;
  status: string;
}
@Component({
  selector: 'app-enrolledusers',
  templateUrl: './enrolledusers.component.html',
  styleUrls: ['./enrolledusers.component.css']
})
export class EnrolledusersComponent {

  // enrolledUsers: EnrolledUser[] = [];
  displayedColumns:string[]=["username","courseName","status"]
  authService:AuthService=inject(AuthService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  enrolledUsers = new MatTableDataSource<EnrolledUser>();
  searchControl = new FormControl();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEnrolledUsers(this.authService.loggedUser.id);
  }


  

  fetchEnrolledUsers(instructorId: number): void {
    this.http.get<EnrolledUser []>(`http://localhost:8080/api/enrollments/by-instructor/${instructorId}`)
      .subscribe(
        data =>{ 
          this.enrolledUsers.data = data
          this.enrolledUsers.paginator = this.paginator;
          this.enrolledUsers.sort = this.sort;
      
          this.searchControl.valueChanges.subscribe(value => {
            this.enrolledUsers.filter = value.trim().toLowerCase();
          });
          
        },
        error => console.error('Error fetching enrolled users:', error)
      );
  }
}


