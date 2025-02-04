import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { course2 } from '../models/course2';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  uploadQuiz(quizData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quizzes`, quizData);
  }

  getCoursesWithoutQuizzes(): Observable<course2[]> {
    return this.http.get<course2[]>(`${this.baseUrl}/courses/without-quizzes`);
  }
}