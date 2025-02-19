import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ManageCourseService } from '../manageCourse.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../Services/user.service';
import { PaymentdialogComponent } from '../paymentdialog/paymentdialog.component';
import { Enrollment } from 'src/app/models/Enrollment';
import { Payment } from 'src/app/models/Payment';
import { courseDetails } from 'src/app/models/Course';
import { PaymentSuccessDialogComponent } from '../payment-success-dialog/payment-success-dialog.component';





@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  obj!: Enrollment;
  obj2!: Payment;
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  // _snackBar: MatSnackBar = inject(MatSnackBar);
  course: courseDetails | undefined;
  manage: ManageCourseService = inject(ManageCourseService);
  dialog: MatDialog = inject(MatDialog);

  



  constructor(private router: Router, private route: ActivatedRoute) {
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

  openDialog(): void {
    this.dialog.open(PaymentSuccessDialogComponent, {
      width: '400px',
      data: {}
    });
  }

  handlePayment() {
    if (!this.course) return;

    const dialogRef = this.dialog.open(PaymentdialogComponent, {
      width: '400px',
      data: { amount: this.course?.price, courseName: this.course?.coursename }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.processPayment();
      }
    });
  }

  private processPayment() {



    this.obj = {
      status: "Started",
      userId: this.authService.loggedUser.id,
      courseId: this.course?.courseid
    };

    const currentDate = new Date().toISOString().split('T')[0];

    this.obj2 = {
      amount: this.course?.price,
      courseId: this.course?.courseid,
      userId: this.authService.loggedUser.id,
      paymentDate: currentDate
    };

    this.manage.doPayment(this.obj2).subscribe(() => {
      this.manage.enrolledCourse(this.obj);
      this.router.navigateByUrl("/user/my-courses");
    });
  }


}
