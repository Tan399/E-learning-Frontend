import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { course2 } from '../models/course2';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/secure/instructor/api';

  constructor(private http: HttpClient) {}



  getCoursesWithoutQuizzes(): Observable<course2[]> {
    return this.http.get<course2[]>(`${this.baseUrl}/courses/without-quizzes`);
  }
}