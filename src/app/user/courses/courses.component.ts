import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ManageCourseService } from '../manageCourse.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { forkJoin, switchMap, debounceTime } from 'rxjs';
import { MyCourse } from '../my-courses/my-courses.component';


export interface course {
  courseid: number,
  name: string,
  description: string,
  image: SafeUrl | null,
  price: string,
  level: string,
  enrolled: number,
  category: string,
  duration: number
}

export interface courseDetails {
  category: string,
  courseImage: SafeUrl | null,
  courseid: number,
  coursename: string,
  description: string,
  duration: number,
  enrolledCount: number,
  level: string,
  price: number,
  videoUrl: string
}
export interface courseDetails2 {
  categoryId: number,
  courseImage: SafeUrl | null,
  courseid: number,
  coursename: string,
  description: string,
  duration: number,
  instructorId:number
  enrolledCount: number,
  level: string,
  price: number,
  videoUrl: string
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  categories = [
    '3D & Animation',
    'Affiliate Marketing',
    'Business',
    'Design',
    'Graphic Design',
    'Marketing',
    'Calculus',
    'Health & Fitness',
    "Photography'",
    'Development'
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
  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.manage.courseUpdated.subscribe((d)=>{
      if(d){
        this.courses=this.manage.courses
        this.userService.enrolledCourseByUserId(this.authService.loggedUser  .id)
        .pipe(
          debounceTime(500), 
          switchMap((data: MyCourse[]) => {
            const courseIds = data.map(d => d.courseId);
            return forkJoin(courseIds.map(id => this.userService.getCourseById(id)));
          })
        )
        .subscribe((courses: courseDetails2[]) => {
          console.log(courses);
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
     console.log(this.enrolledCourses);
     
    
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
        // console.log(this.enrolledCourses.length);
        if (!this.enrolledCourses) {
          return true;
        }
        console.log(!this.enrolledCourses.some(enrolledCourse => enrolledCourse.courseid == course.courseid));
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

  
  onCategoryChange(selectedOptions: any[]) {
    this.selectedCategories = selectedOptions.map(option => option.value); 
  this.filterCourses();
  }


  handleClick(id: number, course: courseDetails) {
    this.router.navigateByUrl(`/user/course-details/${id}`, { state: { course } });
  }
}