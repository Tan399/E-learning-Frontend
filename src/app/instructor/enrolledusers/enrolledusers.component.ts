
  import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { InstructorService } from '../../Services/instructor.service';
import { EnrolledUser } from 'src/app/models/EnrolledUser';

@Component({
  selector: 'app-enrolledusers',
  templateUrl: './enrolledusers.component.html',
  styleUrls: ['./enrolledusers.component.css']
})
export class EnrolledusersComponent {

  displayedColumns:string[]=["username","courseName","status"]
  authService:AuthService=inject(AuthService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('chart') chart!: ElementRef;
  enrolledUsers = new MatTableDataSource<EnrolledUser>();
  searchControl = new FormControl();
  constructor(private http: HttpClient,private instructorService:InstructorService) {


  }

  ngOnInit(): void {
    this.fetchEnrolledUsers(this.authService.loggedUser.id);
  }


  

  fetchEnrolledUsers(instructorId: number): void {
    this.http.get<EnrolledUser []>(`http://localhost:8080/secure/instructor/api/enrollments/by-instructor/${instructorId}`)
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

  scrollToChart(): void {
    this.chart.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  
}


