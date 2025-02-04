import { HttpClient } from "@angular/common/http";
import { EventEmitter, inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  courseDetails } from "./courses/courses.component";
import { Enrollment } from "./course-details/course-details.component";
import { enrollmentResponse } from "../Services/enrollmentResponse";
import { courseDetails2 } from "./my-courses/my-courses.component";
import { Feedback2, Quiz, QuizAttempt } from "./watch-course/watch-course.component";



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
    console.log("updated");
    this.update.emit(true)
    
  }

    private baseUrl = 'http://localhost:8080/api';
    http:HttpClient=inject(HttpClient);

    constructor(){}

    submitQuiz(courseId: number, answers: any[]): Observable<any> {
        return this.http.post(`${this.baseUrl}/courses/${courseId}/quiz`, { answers });
      }

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
return this.http.get(`http://localhost:8080/api/courses/${id}/image`, { responseType: 'blob' })
    }

    enrolledCourse(obj:Enrollment){
      return this.http.post(`${this.baseUrl}/enrollments`,obj);
    }
    enrolledCourseByUserId(id:number):Observable<enrollmentResponse[]>{
      return this.http.get<enrollmentResponse[]>(`${this.baseUrl}/enrollments/user/${id}`);
    }

    getQuizzByCourse(courseId: number): Observable<Quiz> {
      return this.http.get<Quiz>(`http://localhost:8080/api/quizzes/${courseId}`);
    }
  
    submitQuizAttempt(attempt: QuizAttempt): Observable<any> {
      return this.http.post(`http://localhost:8080/api/quiz-attempts/attempt`, attempt);
    }
}