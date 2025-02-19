import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

import { Observable } from "rxjs";


import { course2 } from "../models/course2";
import { categories } from "../models/categories";

import { Feedback } from "../models/Feeback";
import { Payment2 } from "../models/Payment";
import { courseDetails } from "../models/Course";





@Injectable({
    providedIn:"root"
})
export class InstructorService{

    authService:AuthService=inject(AuthService)

    baseUrl:string="http://localhost:8080/secure/instructor/api"
    baseUrl2:string="http://localhost:8080/api"
    http:HttpClient=inject(HttpClient);

    constructor(){

    }

    getCategories():Observable<categories[]>{
        return this.http.get<categories[]>(`${this.baseUrl2}/coursecategory/titles`);
    }

    getCourseImage(id:number){
      return   this.http.get(`${this.baseUrl}/courses/${id}/image`,{ responseType: 'blob' })
    }

    getInstructorCourses():Observable<course2[]>{
        return this.http.get<course2[]>(`${this.baseUrl}/courses/instructor/${this.authService.loggedUser.id}`);
    }

    getInstructorCourseFeedback(id:number):Observable<Feedback[]>{
        return this.http.get<Feedback[]>(`${this.baseUrl}/coursefeedback/course/${id}`);
    }

    uploadCourse(formData:FormData){
        return this.http.post(`${this.baseUrl}/courses/upload`,formData);
    }


    updateCourse(formData: FormData, courseId: number): Observable<courseDetails> {
        return this.http.put<courseDetails>(`${this.baseUrl}/courses/${courseId}`, formData);
      }

    deleteCourse(id:number){
        return this.http.delete(`${this.baseUrl}/courses/${id}`);
    }

    getPaymentsForInstructor(instructorId: number) {
        return this.http.get<Payment2[]>(`${this.baseUrl2}/payments/instructor/${instructorId}/course-payments`);
      }
    
    
}