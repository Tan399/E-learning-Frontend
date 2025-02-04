import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InstructorRoutingModule } from './instructor-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { ManageCoursesComponent } from './manage-course/manage-course.component';
import { MatSelectModule } from '@angular/material/select';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { UploadQuizComponent } from './upload-quiz/upload-quiz.component';
import { EnrolledusersComponent } from './enrolledusers/enrolledusers.component';
import { DeleteDialogueComponent } from './deletedelete-dialogue/delete-dialogue.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InstructorResultComponent } from './instructor-result/instructor-result.component';
import { InstructorPaymentsComponent } from './instructor-payments/instructor-payments.component';




@NgModule({
  declarations: [AddCourseComponent, ManageCoursesComponent, CourseDetailsComponent, EditCourseComponent, UploadQuizComponent, EnrolledusersComponent,DeleteDialogueComponent, InstructorResultComponent, InstructorPaymentsComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class InstructorModule {}
