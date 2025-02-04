import { EventEmitter, inject, Injectable } from "@angular/core";
import { courseDetails } from "./courses/courses.component";
import { UserService } from "./user.service";
import { Enrollment, Payment } from "./course-details/course-details.component";
import { enrollmentResponse } from "../Services/enrollmentResponse";
import { timer } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})
export class ManageCourseService{
    userService:UserService=inject(UserService)
    courses:courseDetails[]=[]
    http:HttpClient=inject(HttpClient)


    courseUpdated:EventEmitter<boolean>=new EventEmitter();



    getCourses(){
       return this.userService.getCourses().subscribe((data)=>{
            this.courses=data
            timer(500).subscribe(() => {
                this.courseUpdated.emit(true)
            })
        })

    }


    doPayment(data:Payment){
      return  this.http.post("http://localhost:8080/api/payments",data)
    }

    setCourse(data:any){
           this.courses=data
    }

    enrolledCourse(obj:Enrollment){
        return this.userService.enrolledCourse(obj).subscribe((data)=>{
            this.userService.updatefunc();
        })

    }

}