import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { courseDetails } from '../courses/courses.component';
import { ManageCourseService } from '../manageCourse.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../user.service';





export interface Enrollment{

  status:string;

 userId:number;

 courseId:number|undefined;
}
export interface Payment{

  amount:number| undefined;

 userId:number;

 courseId:number|undefined;
 paymentDate:string;
}
export interface Payment2{

  paymentAmount:number| undefined;

 userId:number;

 courseId:number|undefined;
 paymentDate:string;
}

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
makePayment() {
throw new Error('Method not implemented.');
}
 obj!:Enrollment;
 obj2!:Payment;
 authService:AuthService=inject(AuthService)
 userService:UserService=inject(UserService)
 _snackBar:MatSnackBar=inject(MatSnackBar);
 course: courseDetails | undefined;
 manage:ManageCourseService=inject(ManageCourseService)

 constructor(private router: Router,private route:ActivatedRoute) {

   const navigation = this.router.getCurrentNavigation();
   if (navigation?.extras.state) {
     this.course = navigation.extras.state['course'];
   }
 }
  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      const courseId = +params.get('id')!;
   
    });
  }

 


  handlePayment(){
    this._snackBar.open(`Payment successfully Done for Course with id  ${this.course?.coursename}`);
   this.obj={
    status:"Started",
    userId:this.authService.loggedUser.id,
    courseId:this.course?.courseid
   }

   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];

   this.obj2={
    amount:this.course?.price,
    courseId:this.course?.courseid,
    userId:this.authService.loggedUser.id,
    paymentDate:formattedDate


   }

   this.manage.doPayment(this.obj2).subscribe(()=>{
    this.manage.enrolledCourse(this.obj);
   })
   

   
   
    setTimeout(()=>{
      this._snackBar.dismiss()
    },2000)
    this.router.navigateByUrl("/user/my-courses")

  }
}
