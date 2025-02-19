import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InstructorService } from '../../Services/instructor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Payment2 } from 'src/app/models/Payment';

interface CategoryWiseSales {
  [category: string]: number;
}

@Component({
  selector: 'app-instructor-payments',
  templateUrl: './instructor-payments.component.html',
  styleUrls: ['./instructor-payments.component.css']
})
export class InstructorPaymentsComponent {
  authService = inject(AuthService)
  chartColumns: string[] = [];
  chartData: number[] = [];
 @ViewChild('chart') chart!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['courseName', 'studentName', 'amount', 'paymentDate'];
  dataSource: MatTableDataSource<Payment2> = new MatTableDataSource();

  categoryWiseSalesDataSource: MatTableDataSource<any> = new MatTableDataSource();
  categoryWiseSalesColumns: string[] = ['category', 'totalSales'];

  constructor(private paymentService: InstructorService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const instructorId = this.authService.loggedUser  .id;
    this.loadCoursePayments(instructorId);
  }

  scrollToChart(): void {
    this.chart.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  loadCoursePayments(instructorId: number) {
    this.paymentService.getPaymentsForInstructor(instructorId).subscribe(
      (results: Payment2[]) => {

        const salesData = results
        const categoryWiseSales: CategoryWiseSales = salesData.reduce((acc: CategoryWiseSales, current:Payment2) => {
          const category = current.courseCategory;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += current.paymentAmount;
          return acc;
        }, {} as CategoryWiseSales);

        var col:string[]=[]
        var data:number[]=[]

        Object.keys(categoryWiseSales).map(category=>{
          col.push(category)
          data.push(categoryWiseSales[category])
        })

        this.chartColumns=col;
        this.chartData=data;


   

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