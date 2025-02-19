import { Component, Input } from '@angular/core';
import { Chart,registerables  } from 'chart.js';
import { InstructorService } from '../../Services/instructor.service';
import { course2 } from 'src/app/models/course2';
Chart.register(...registerables);

@Component({
  selector: 'app-payment-chart',
  templateUrl: './payment-chart.component.html',
  styleUrls: ['./payment-chart.component.css']
})
export class PaymentChartComponent {

  @Input()
columns:string[] = [];

@Input()
  data:number[] = [];

 ctx:string='bar';

  labels:string[] = [];

  myChart!:Chart;
  constructor(private instructorService:InstructorService){
   

  

  
  }


  ngOnChanges(){
    console.log(this.columns);
    console.log(this.data);
    this.RenderChart()
  }

 

 
  RenderChart(){
 
    if( this.myChart){
      this.myChart.clear();
      this.myChart.destroy();
    }
 
    this.myChart = new Chart(this.ctx,{
      type: 'pie',
      data:{
        labels: this.columns,
        datasets: [{
          label: "Category Wise Sales",
          data:this.data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(100, 100, 100)',
            'rgb(158, 104, 116)',
            'rgb(36, 62, 79)',
            'rgb(91, 42, 42)',
          ],
      
        }]
      }
    })
    
  }
}