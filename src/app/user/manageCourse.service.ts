import { EventEmitter, inject, Injectable } from "@angular/core";

import { UserService } from "../Services/user.service";

import { timer } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Enrollment } from "../models/Enrollment";
import { Payment } from "../models/Payment";
import { courseDetails } from "../models/Course";
import { MatDialog } from "@angular/material/dialog";
import { PaymentSuccessDialogComponent } from "./payment-success-dialog/payment-success-dialog.component";

@Injectable({
    providedIn:"root"
})
export class ManageCourseService{

      dialog: MatDialog = inject(MatDialog);
    userService:UserService=inject(UserService)
    courses:courseDetails[]=[]
    url:string='http://localhost:8080/api/payments'
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
      return  this.http.post(`${this.url}`,data)
    }

    setCourse(data:courseDetails[]){
           this.courses=data
    }

    enrolledCourse(obj:Enrollment){
        return this.userService.enrolledCourse(obj).subscribe((data)=>{
            this.userService.updatefunc();
            setTimeout(()=>{
                this.dialog.open(PaymentSuccessDialogComponent, {
                    width: '400px',
                    data: {}
                  });
            },1000)
          
        })

    }

}