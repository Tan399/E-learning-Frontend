import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ManageCourseService } from '../manageCourse.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { forkJoin, switchMap, debounceTime } from 'rxjs';

import { InstructorService } from 'src/app/Services/instructor.service';
import { categories } from 'src/app/models/categories';
import { MatListOption } from '@angular/material/list';
import { courseDetails, courseDetails2, MyCourse } from 'src/app/models/Course';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  categories:categories[] = [
  ];

  userService: UserService = inject(UserService);

  courses: courseDetails[] = [];
  searchVal: string = '';
  searchQuery: string = '';
  selectedSort: string = '';
  selectedCategories: string[] = [];
  enrolledCourses!:courseDetails2[];
  filteredCourses: courseDetails[] = [];
  manage:ManageCourseService=inject(ManageCourseService)
  authService:AuthService=inject(AuthService)
  constructor(private router: Router, private sanitizer: DomSanitizer,private instructorService:InstructorService) {
    this.manage.courseUpdated.subscribe((d)=>{
      if(d){
        this.courses=this.manage.courses
        this.userService.enrolledCourseByUserId(this.authService.loggedUser.id)
        .pipe(
          debounceTime(1000),
          switchMap((data: MyCourse[]) => {
            const courseIds = data.map(d => d.courseId);
            return forkJoin(courseIds.map(id => this.userService.getCourseById(id)));
          })
        )
        .subscribe((courses: courseDetails2[]) => {
      
        this.enrolledCourses=courses
        
        this.filterCourses();
        });
        
        // this.filterCourses();
        this.loadCourses()

      }
    })
    
    this.manage.getCourses()

    this.userService.eventEnrolled.subscribe((data)=>{
     this.enrolledCourses=data
     this.filterCourses();
    
    })

    this.instructorService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
     
    
  }

  loadCourses() {
 
     
      const imageFetchPromises = this.courses.map(course => {
        return this.userService.fetchImage(course.courseid).toPromise().then(blob => {
          if (blob) {
            const objectURL = URL.createObjectURL(blob);
            course.courseImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          } else {
           
            course.courseImage = null; 
          }
        }).catch(err => {
         
          console.error(`Error fetching image for course ${course.courseid}:`, err);
          course.courseImage = null;
        });
      });
  
      Promise.all(imageFetchPromises).then(() => {
        this.filteredCourses = [...this.courses]; 
        this.filterCourses();
      });

  }
  

  filterCourses() {
    this.filteredCourses = this.courses
      .filter(course =>
        course.coursename.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .filter(course => {
        if (this.selectedCategories.length === 0) {
          return true; 
        }
        return this.selectedCategories.includes(course.category); 
      })
      .filter(course => {
     
        if (!this.enrolledCourses) {
          return true;
        }
       
        return !this.enrolledCourses.some(enrolledCourse => enrolledCourse.courseid == course.courseid);
      })
      .sort((a, b) => {
        if (this.selectedSort === 'newest') {
          return b.courseid - a.courseid;
        } else if (this.selectedSort === 'most-popular') {
          return b.enrolledCount - a.enrolledCount;
        } else if (this.selectedSort === 'price') {
          const priceA = a.price;
          const priceB = b.price;
          return priceA - priceB;
        }
        return 0; 
      });
  }
  

  onSearchChange() {
    this.searchQuery = this.searchVal;
    this.filterCourses();
  }

  
  onSortChange(option: string) {
    this.selectedSort = option;
    this.filterCourses();
  }

  
  onCategoryChange(selectedOptions: MatListOption[]) {
    console.log(selectedOptions);
    this.selectedCategories = selectedOptions.map(option => option.value); 
  this.filterCourses();
  }


  handleClick(id: number, course: courseDetails) {
    this.router.navigateByUrl(`/user/course-details/${id}`, { state: { course } });
  }
}