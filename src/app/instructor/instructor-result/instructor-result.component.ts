import { Component, inject,ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { QuizService } from 'src/app/Services/QuizService.service';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { quizAttempt } from 'src/app/models/QuizAttempt';






@Component({
  selector: 'app-instructor-result',
  templateUrl: './instructor-result.component.html',
  styleUrls: ['./instructor-result.component.css']
})
export class InstructorResultComponent {

  authService=inject(AuthService)

  displayedColumns: string[] = ['courseName', 'quizTitle', 'studentName', 'score'];
  dataSource: MatTableDataSource<quizAttempt> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(private quizService: QuizService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const instructorId = this.authService.loggedUser.id; 
    this.loadQuizResults(instructorId);
  }

  loadQuizResults(instructorId: number) {
    this.quizService.getQuizResultsForInstructor(instructorId).subscribe(
      (results: quizAttempt[]) => {
 
        this.dataSource.data = results;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      () => {
        this.snackBar.open('Error fetching quiz results.', 'Close', { duration: 3000 });
      }
    );
  }
}
