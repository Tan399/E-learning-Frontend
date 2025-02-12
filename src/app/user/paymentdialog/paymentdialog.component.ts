import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paymentdialog',
  templateUrl: './paymentdialog.component.html',
  styleUrls: ['./paymentdialog.component.css']
})
export class PaymentdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { amount: number; courseName: string }
  ) {}

  confirmPayment() {
    this.dialogRef.close(true);
  }
}
