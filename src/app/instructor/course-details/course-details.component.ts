import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InstructorService } from '../../Services/instructor.service';
import { course2 } from 'src/app/models/course2';
import { Feedback } from 'src/app/models/Feeback';






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

    ];


    this.enrolledUsers = this.data.enrolledCount || 0;
  }
}
