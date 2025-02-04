import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

import { Observable } from "rxjs";


import { Feedback } from "./course-details/course-details.component";
import { course2 } from "../models/course2";
import { categories } from "../models/categories";
import { Payment2 } from "../user/course-details/course-details.component";





@Injectable({
    providedIn:"root"
})
export class InstructorService{

    authService:AuthService=inject(AuthService)


    http:HttpClient=inject(HttpClient);

    constructor(){

    }

    getCategories():Observable<categories[]>{
        return this.http.get<categories[]>(`http://localhost:8080/api/coursecategory/titles`);
    }

    getCourseImage(id:number){
      return   this.http.get(`http://localhost:8080/api/courses/${id}/image`,{ responseType: 'blob' })
    }

    getInstructorCourses():Observable<course2[]>{
        return this.http.get<course2[]>(`http://localhost:8080/api/courses/instructor/${this.authService.loggedUser.id}`);
    }

    getInstructorCourseFeedback(id:number):Observable<Feedback[]>{
        return this.http.get<Feedback[]>(`http://localhost:8080/api/coursefeedback/course/${id}`);
    }

    uploadCourse(formData:FormData){

        return this.http.post('http://localhost:8080/api/courses/upload',formData);
    }


    updateCourse(formData: FormData, courseId: number): Observable<any> {
        return this.http.put(`http://localhost:8080/api/courses/${courseId}`, formData);
      }

    deleteCourse(id:number){
        return this.http.delete(`http://localhost:8080/api/courses/${id}`);
    }

    getPaymentsForInstructor(instructorId: number) {
        return this.http.get<Payment2[]>(`http://localhost:8080/api/payments/instructor/${instructorId}/course-payments`);
      }
    
    
}