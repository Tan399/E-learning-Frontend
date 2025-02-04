import { QuizService } from 'src/app/Services/QuizService.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InstructorService } from '../instructor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from 'src/app/Services/CourseService.service';
import { course2 } from 'src/app/models/course2';

@Component({
  selector: 'app-upload-quiz',
  templateUrl: './upload-quiz.component.html',
  styleUrls: ['./upload-quiz.component.css']
})
export class UploadQuizComponent implements OnInit {

  quizForm: FormGroup;
  courses!:course2[];
  flag:boolean=false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private instuctorService: InstructorService,
    private quizService: QuizService,
    private snackBar: MatSnackBar
  ) {
    this.quizForm = this.fb.group({
      courseid: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['',Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // this.loadCourses();
    this.loadCoursesWithoutQuizzes();
  }

  // loadCourses() {
  //   this.instuctorService.getInstructorCourses().subscribe((courses) => {
  //     this.courses = courses;
  //   });
  // }

  loadCoursesWithoutQuizzes() {
    this.courseService.getCoursesWithoutQuizzes().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Error fetching courses:', err)
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.flag=true
    const questionForm = this.fb.group({
      questionText: ['', Validators.required],
      answers: this.fb.array([
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer()
      ]),
      correctAnswerIndex: [0, Validators.required]
    });
    this.questions.push(questionForm);
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answerText: ['', Validators.required]
    });
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  submitQuiz() {

    if(this.flag){
      if (this.quizForm.invalid) {
        this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
        return;
      }
    
      const quizData = this.quizForm.value;
      console.log(quizData);
    
  
  
    
      quizData.questions.forEach((question: any) => {
        const answersU = new Set<string>();
        question.answers.forEach((answer: any, index: number) => {
        answersU.add(answer.answerText);
        });
        if(answersU.size!=4){
          this.snackBar.open('Each answer must be Unique.', 'Close', { duration:3000})
        }
      });

      


    
      this.quizService.createQuiz(quizData).subscribe(
        () => {
          this.snackBar.open('Quiz uploaded successfully!', 'Close', { duration: 3000 });
          this.quizForm.reset();
          this.questions.clear();
          this.quizForm.markAsPristine();
          this.quizForm.markAsUntouched();
          Object.keys(this.quizForm.controls).forEach(key => {
            this.quizForm.controls[key].setErrors(null);
     });

     this.flag=false;
        },
        (error) => {
          console.error('Error uploading quiz:', error);
        }
      );
    }else{
      this.snackBar.open('Please Add question first', 'Close', { duration: 300});
    }
   
  }
  
  
}