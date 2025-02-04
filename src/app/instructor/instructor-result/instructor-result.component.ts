import { Component, inject,ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { QuizService } from 'src/app/Services/QuizService.service';
import {  MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';




export interface quizAttempt{
courseName:string,
quizTitle:string,
score:number,
studentName:string
}

@Component({
  selector: 'app-instructor-result',
  templateUrl: './instructor-result.component.html',
  styleUrls: ['./instructor-result.component.css']
})
export class InstructorResultComponent {

  authService=inject(AuthService)

  displayedColumns: string[] = ['courseName', 'quizTitle', 'studentName', 'score'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
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
