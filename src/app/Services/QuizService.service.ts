import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Quiz2 } from '../models/Quiz';
import { quizAttempt } from '../models/QuizAttempt';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
 
  private baseUrl = 'http://localhost:8080/secure/instructor/api/quizzes';

  constructor(private http: HttpClient) {}

  createQuiz(quizData: Quiz2) {
    
    return this.http.post<Quiz2>(this.baseUrl, quizData);
  }

  getQuizResultsForInstructor(instructorId: number):Observable<quizAttempt[]> {
    return this.http.get<quizAttempt[]>(`http://localhost:8080/api/quiz-attempts/instructor/${instructorId}/course-quiz-results`);
  }


  getStudentScores(userId: number) {
    return this.http.get<quizAttempt[]>(`http://localhost:8080/api/quiz-attempts/user/${userId}/course-quiz-results`);
  }


}