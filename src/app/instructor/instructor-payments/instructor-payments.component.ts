import { Component,inject,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InstructorService } from '../../Services/instructor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Payment2 } from 'src/app/models/Payment';


@Component({
  selector: 'app-instructor-payments',
  templateUrl: './instructor-payments.component.html',
  styleUrls: ['./instructor-payments.component.css']
})
export class InstructorPaymentsComponent {
  authService=inject(AuthService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['courseName', 'studentName', 'amount', 'paymentDate'];
  dataSource: MatTableDataSource<Payment2> = new MatTableDataSource();

  constructor(private paymentService:InstructorService, private snackBar: MatSnackBar) {}


  ngOnInit(): void {
    const instructorId =this.authService.loggedUser.id ; 
    this.loadCoursePayments(instructorId);
  }

  loadCoursePayments(instructorId: number) {
    this.paymentService.getPaymentsForInstructor(instructorId).subscribe(
      (results: Payment2[]) => {
      
      
        this.dataSource.data = results;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    
      },
      (error) => {
        this.snackBar.open('Error fetching payment records.', 'Close', { duration: 3000 });
      }
    );
  }
}