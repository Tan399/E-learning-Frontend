import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success-dialog',
  templateUrl: './payment-success-dialog.component.html',
  styleUrls: ['./payment-success-dialog.component.css']
})
export class PaymentSuccessDialogComponent {
  
  router=inject(Router);

  handleExplore(){
this.router.navigateByUrl("/user/courses")
  }

}
