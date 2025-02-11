import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstructorService } from '../../Services/instructor.service';
import { course2, InitialFormValue } from 'src/app/models/course2';

import { categories } from 'src/app/models/categories';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  editCourseForm: FormGroup;
  uploadedImagePreview: string | ArrayBuffer | null | SafeUrl = null;
  instructorService: InstructorService = inject(InstructorService);
  authService: AuthService = inject(AuthService);
  appService: AppService = inject(AppService);
  categories: categories[] = [];
  selectedFile: File | null = null;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  private initialFormValues!: InitialFormValue;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<EditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: course2
  ) {
    this.editCourseForm = this.fb.group({
      coursename: [data.coursename, [Validators.required]],
      description: [
        data.description,
        [Validators.required, Validators.minLength(40), Validators.maxLength(120)],
      ],
      level: [data.level, [Validators.required]],
      categoryId: [data.categoryId, [Validators.required]],
      price: [data.price, [Validators.required, Validators.min(0)]],
      videoUrl: [data.videoUrl, [Validators.required]],
      duration: [data.duration || '', [Validators.required, Validators.min(1)]],
    });

    this.instructorService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.instructorService.getCourseImage(data.courseid).subscribe((blob) => {
    
      const objectURL = URL.createObjectURL(blob);
    
      this.uploadedImagePreview = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  ngOnInit(): void {
    this.initialFormValues = this.editCourseForm.getRawValue();
    console.log(this.initialFormValues);
    if (this.data.courseImage) {
      this.uploadedImagePreview = this.data.courseImage;
    }
  }

  onImageUpload(event: Event  ): void {
    const element = event.currentTarget as HTMLInputElement;
    const file = element.files![0]

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      this.selectedFile = file;
    }
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 1500);
  }

  onSubmit(): void {
    const currentFormValues = this.editCourseForm.getRawValue();
    if (JSON.stringify(this.initialFormValues) === JSON.stringify(currentFormValues) && !this.selectedFile) {
      this.openSnackBar('No changes detected.');
      return;
    }

    if (this.editCourseForm.valid) {
      const courseDTO = {
        ...this.editCourseForm.value,
        instructorId: this.authService.loggedUser.id,
      };
    

      const formData = new FormData();
      formData.append(
        'CourseDTO',
        new Blob([JSON.stringify(courseDTO)], { type: 'application/json' })
      );

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.instructorService.updateCourse(formData, this.data.courseid).subscribe({
        next: () => {
          this.openSnackBar('Course updated successfully!');
          this.initialFormValues = currentFormValues; 
          this.onCancel();
        },
        error: (err) => {
          console.error('Error updating course:', err);
          this.openSnackBar('Failed to update the course. Please try again.');
        },
      });
    } else {
      this.openSnackBar('Form is invalid. Please check your input.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
