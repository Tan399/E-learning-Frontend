import { HttpClient } from "@angular/common/http";
import { EventEmitter, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { enrollmentResponse } from "./enrollmentResponse";
import { courseDetails2 } from "../user/my-courses/my-courses.component";

import { Enrollment } from "../models/Enrollment";
import { courseDetails } from "../models/Course";
import { Feedback2, Quiz, QuizAttempt } from "../models/tempModels";




@Injectable({
    providedIn: 'root'
})
export class UserService{

  eventEnrolled:EventEmitter<courseDetails2[]>=new EventEmitter();

  emitEnrolledCourses(data:courseDetails2[]){
    this.eventEnrolled.emit(data)
  }
  update:EventEmitter<boolean>=new EventEmitter();

  updatefunc(){
  
    this.update.emit(true)
    
  }

    private baseUrl = 'http://localhost:8080/secure/instructor/api';
    private baseUrl2='http://localhost:8080/api'
    http:HttpClient=inject(HttpClient);

    constructor(){}

  

      getCourses():Observable<courseDetails[]>{
        return this.http.get<courseDetails[]>(`${this.baseUrl}/courses`);
      }
      getCourseById(id:number):Observable<courseDetails2>{
        return this.http.get<courseDetails2>(`${this.baseUrl}/courses/${id}`);
      }

      sendFeedback(fb:Feedback2){
       return this.http.post(`${this.baseUrl}/coursefeedback`,fb)
      }

    fetchImage(id:number): Observable<Blob>{
return this.http.get(`${this.baseUrl}/courses/${id}/image`, { responseType: 'blob' })
    }

    enrolledCourse(obj:Enrollment){
      return this.http.post(`${this.baseUrl}/enrollments`,obj);
    }
    enrolledCourseByUserId(id:number):Observable<enrollmentResponse[]>{
      return this.http.get<enrollmentResponse[]>(`${this.baseUrl}/enrollments/user/${id}`);
    }

    getQuizzByCourse(courseId: number): Observable<Quiz> {
      return this.http.get<Quiz>(`${this.baseUrl}/quizzes/${courseId}`);
    }
  
    submitQuizAttempt(attempt: QuizAttempt): Observable<QuizAttempt> {
      return this.http.post<QuizAttempt>(`${this.baseUrl2}/quiz-attempts/attempt`, attempt);
    }
}