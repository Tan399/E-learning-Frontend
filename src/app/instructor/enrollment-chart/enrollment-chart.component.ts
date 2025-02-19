import { Component, Input } from '@angular/core';
import { Chart,registerables  } from 'chart.js';
import { InstructorService } from '../../Services/instructor.service';
import { course2 } from 'src/app/models/course2';
Chart.register(...registerables);
@Component({
  selector: 'app-enrollment-chart',
  templateUrl: './enrollment-chart.component.html',
  styleUrls: ['./enrollment-chart.component.css']
})
export class EnrollmentChartComponent {

  columns:string[] = [];
  count:number[] = [];

 ctx:string='bar';

  labels:string[] = [];

  myChart!:Chart;
  constructor(private instructorService:InstructorService){
    this.instructorService.getInstructorCourses().subscribe((data:course2[])=>{
      this.columns=data.map((course:course2)=>{
        return course.coursename
      })
      this.count=data.map((course:course2)=>{
        return course.enrolledCount
      })


      setTimeout(()=>{
        this.RenderChart()
      },1200)

      

    });
  }

 

 
  RenderChart(){
 
 
 
    this.myChart = new Chart(this.ctx,{
      type: 'bar',
      data: {
        labels: this.columns,  
        datasets: [{
          label: "Course Enrollments", 
          data: this.count, 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    })
    
  }
}
