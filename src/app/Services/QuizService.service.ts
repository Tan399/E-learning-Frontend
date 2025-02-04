import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { course2 } from '../models/course2';
import { quizAttempt } from '../instructor/instructor-result/instructor-result.component';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
 
  private baseUrl = 'http://localhost:8080/api/quizzes';

  constructor(private http: HttpClient) {}

  createQuiz(quizData: any) {
    console.log(quizData);
    return this.http.post(this.baseUrl, quizData);
  }

  getQuizResultsForInstructor(instructorId: number):Observable<quizAttempt[]> {
    return this.http.get<quizAttempt[]>(`http://localhost:8080/api/quiz-attempts/instructor/${instructorId}/course-quiz-results`);
  }


  getStudentScores(userId: number) {
    return this.http.get<quizAttempt[]>(`http://localhost:8080/api/quiz-attempts/user/${userId}/course-quiz-results`);
  }


}