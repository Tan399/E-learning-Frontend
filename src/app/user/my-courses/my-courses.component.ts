import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ManageCourseService } from '../manageCourse.service';
import { UserService } from '../../Services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { MatTableDataSource } from '@angular/material/table';
import { SafeUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { forkJoin } from 'rxjs';
import { MyCourse } from 'src/app/models/Course';




export interface courseDetails2{
   categoryId: number,
    courseImage: SafeUrl | null,
    courseid: number,
    coursename: string,
    description: string,
    duration: number,
    enrolledCount: number,
    instructorId:number
    level: string,
    price: number,
    videoUrl: string
}


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent {
  userService:UserService=inject(UserService)
  authService:AuthService=inject(AuthService)
  manage:ManageCourseService=inject(ManageCourseService)
  proj!:courseDetails2[]
  dataSource!: MatTableDataSource<courseDetails2>;
  myCourses = [
    { id: 1, name: 'Java Programming', progress: '70%' },
    { id: 2, name: 'Angular Development', progress: '40%' }
  ];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private router: Router) {
     this.userService.update.subscribe((flag)=>{
      if(flag){
         this.userService.enrolledCourseByUserId(this.authService.loggedUser .id)
      .pipe(
        switchMap((data: MyCourse[]) => {
          const courseIds = data.map(d => d.courseId);
          return forkJoin(courseIds.map(id => this.userService.getCourseById(id)));
        })
      )
      .subscribe((courses: courseDetails2[]) => {
      
        this.proj = courses;
        this.dataSource = new MatTableDataSource(this.proj);
        this.userService.emitEnrolledCourses(courses)
      });
      }

    
     
     })

     this.userService.enrolledCourseByUserId(this.authService.loggedUser .id)
     .pipe(
       switchMap((data: MyCourse[]) => {
         const courseIds = data.map(d => d.courseId);
         return forkJoin(courseIds.map(id => this.userService.getCourseById(id)));
       })
     )
     .subscribe((courses: courseDetails2[]) => {
    
       this.proj = courses;
       this.dataSource = new MatTableDataSource(this.proj);
       this.userService.emitEnrolledCourses(courses)
     });

  

  }

  navigateToWatch(id: number): void {
    this.router.navigateByUrl(`/user/watch-course/${id}`);
  }
}
