import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InstructorService } from '../instructor.service';
import { course2 } from 'src/app/models/course2';



export interface Feedback{
  name:string,
  feedback:string
  }


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  feedbacks: Feedback[] = [];
  enrolledUsers: number = 0; 
instructorService:InstructorService=inject(InstructorService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: course2) {
        this.instructorService.getInstructorCourseFeedback(data.courseid).subscribe((data:Feedback[])=>{
            this.feedbacks=data
        })

  }

  ngOnInit(): void {
   
    this.feedbacks = [
      { name: 'Tanmay', feedback: 'Great course!' },
      { name: 'Dolly', feedback: 'Very helpful.' },
    ];
console.log(this.data);
    console.log(this.data.enrolledCount);

    this.enrolledUsers = this.data.enrolledCount || 0;
  }
}
