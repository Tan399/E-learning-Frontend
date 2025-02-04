import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstructorService } from '../instructor.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courseForm: FormGroup;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  categories = [
   
    'Affiliate Marketing',
    'Business',
    'Graphic Design',
    'Marketing',
    'Calculus',
    'Health & Fitness',
    'Photography',
    'Development',
    
   
    
    
  ];

  @ViewChild("image") imageInput!:ElementRef;

  courseImage!: File ;
  instructorService=inject(InstructorService)
  authService:AuthService=inject(AuthService)
  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      coursename: ['', Validators.required],
      description: ['', [Validators.required,Validators.minLength(40),Validators.maxLength(120)]],
      level: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      videoUrl: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]], 
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.courseImage = file;
      console.log('Course Image Selected:', file);
    }
  }

  

  openSnackBar(msg: string) {
    this._snackBar.open(msg);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, 1500)
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseDTO = {
        ...this.courseForm.value,
        instructorId: this.authService.loggedUser.id,
      };
      console.log(courseDTO);
  
      const formData = new FormData();
      formData.append('CourseDTO', new Blob([JSON.stringify(courseDTO)], { type: 'application/json' }));
      formData.append('file', this.courseImage);
  
      this.instructorService.uploadCourse(formData).subscribe(
        () => {
          this.openSnackBar('Course uploaded successfully');
        },
        () => {
          this.openSnackBar('Failed to upload course');
        }
      );
  
      this.courseForm.reset();
      this.courseForm.markAsPristine();
      this.courseForm.markAsUntouched();
      Object.keys(this.courseForm.controls).forEach(key => {
       this.courseForm.controls[key].setErrors(null);
});

this.imageInput.nativeElement.value = '';

    } else {
      this.openSnackBar('Please fill out all fields.');
    }
  }
  
}