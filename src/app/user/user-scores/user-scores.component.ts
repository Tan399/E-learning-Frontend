import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { quizAttempt } from 'src/app/instructor/instructor-result/instructor-result.component';
import { QuizService } from 'src/app/Services/QuizService.service';

@Component({
  selector: 'app-user-scores',
  templateUrl: './user-scores.component.html',
  styleUrls: ['./user-scores.component.css']
})
export class UserScoresComponent {

authService=inject(AuthService)

  displayedColumns: string[] = ['courseName', 'quizTitle','score'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  constructor(private quizService: QuizService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const instructorId = this.authService.loggedUser.id; 
    this.loadQuizResults(instructorId);
  }

  loadQuizResults(instructorId: number) {
    this.quizService.getStudentScores(instructorId).subscribe(
      (results: quizAttempt[]) => {
        console.log(results);
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
