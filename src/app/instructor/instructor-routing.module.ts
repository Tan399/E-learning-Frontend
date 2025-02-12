import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { ManageCoursesComponent } from './manage-course/manage-course.component';
import { UploadQuizComponent } from './upload-quiz/upload-quiz.component';
import { EnrolledusersComponent } from './enrolledusers/enrolledusers.component';
import { InstructorResultComponent } from './instructor-result/instructor-result.component';
import { InstructorPaymentsComponent } from './instructor-payments/instructor-payments.component';
import { InstructorAuthGuard } from './auth-guard/instructor-auth.guard';
import { AddCourseGuard } from './auth-guard/AddCourseGuard.guard';

const routes: Routes = [
  { path: 'add-course', component: AddCourseComponent,canDeactivate:[AddCourseGuard] },
  { path: 'manage-courses', component: ManageCoursesComponent },
  { path: 'upload-quiz', component: UploadQuizComponent },
  { path: 'enrolled-users', component: EnrolledusersComponent },
  { path: 'instructor-result', component: InstructorResultComponent },
  { path: 'instructor-payments', component: InstructorPaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule {}
