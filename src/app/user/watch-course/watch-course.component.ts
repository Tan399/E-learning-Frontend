import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { courseDetails2 } from '../my-courses/my-courses.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback2, Quiz, QuizAttempt } from 'src/app/models/tempModels';


@Component({
  selector: 'app-watch-course',
  templateUrl: './watch-course.component.html',
  styleUrls: ['./watch-course.component.css']
})
export class WatchCourseComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  fb!: Feedback2;
  flag:boolean=false;
  nohide:boolean=true;
  isQuizAvailable:boolean=false;
  courseId!: number;
  feedback: string = '';
  courseData!: courseDetails2;
  video: string = '';
  val:string[]=[];
  totalScore: number | null = null;
  quiz!: Quiz;
  show:boolean=false;
  map=new Map<number,string|undefined>;
  ans!:string | undefined;
  selectedAnswers: number[] = [];
  courseName: string = '';
  hasAttempted: boolean = false; 

  snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('id')!;
    });

    this.loadCourseData();
    this.loadQuizzes();
  }

  loadCourseData(): void {
    this.userService.getCourseById(this.courseId).subscribe((data) => {
      this.courseData = data;
      this.video = this.courseData.videoUrl;
      this.courseName = this.courseData.coursename;
    });
  }

  loadQuizzes(): void {
    this.userService.getQuizzByCourse(this.courseId).subscribe((quiz: Quiz) => {
     
      this.quiz = quiz;
      this.selectedAnswers = new Array(quiz.questions.length).fill(null);

     
      const userId = this.authService.loggedUser.id;
      this.hasAttempted = quiz.quizAttempts.some(attempt => attempt.userId === userId);
      this.isQuizAvailable=true
    },(err)=>{

    });
  }

  submitQuiz(): void {
    if (this.hasAttempted) {
        this.snackBar.open('You have already attempted this quiz!', 'Close', { duration: 3000 });
        return;
    }

    let score = 0;
    this.quiz.questions.forEach((question, index) => {
        if (this.selectedAnswers[index] === question.correctAnswerIndex) {
            score++;
        }else
        {
          this.map.set(index+1,question.answers.at(question.correctAnswerIndex)?.answerText)

        }
    });

 
     

    this.totalScore = (score / this.quiz.questions.length) * 100;

    const quizAttempt: QuizAttempt = {
        quizId: this.quiz.quizId,
        userId: this.authService.loggedUser.id,
        score: this.totalScore
    };

    this.userService.submitQuizAttempt(quizAttempt).subscribe({
        next: () => {
          this.flag=true;
            this.snackBar.open(`Quiz submitted! Score: ${this.totalScore}%`, 'Close', { duration: 3000 });
           
            if(this.map.size!=0){
              this.show=true;
              for(let key of this.map.keys()){
      
                this.val.push(`*Correct Answer For Question Number ${key} is ${this.map.get(+key)}`)
              }
             }
            
        },
        error: (err) => {
            if (err.status === 400 && err.error.includes("User has already attempted this quiz.")) {
                this.snackBar.open('You have already attempted this quiz! Thank You', 'Close', { duration: 3000 });
                    if(this.map.size!=0){
      this.show=true;
      for(let key of this.map.keys()){
       
        this.val.push(`*Correct Answer For Question Number ${key} is ${this.map.get(+key)}`)
      }
     }
                
                this.nohide=false;
            } else {
           
                this.snackBar.open('Error submitting quiz attempt!', 'Close', { duration: 3000 });
            }
        }
    });
}
 openSnackBar(msg: string): void {
    this.snackBar.open(msg);
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 1500);
  }

  submitFeedback(): void {
    if (this.feedback.trim() !== '') {
      this.fb = {
        feedback: this.feedback,
        courseId: this.courseId,
        userId: this.authService.loggedUser.id
      };

      this.userService.sendFeedback(this.fb).subscribe(() => {
        this.openSnackBar('Feedback sent successfully');
      }, (err) => {
        this.openSnackBar('Error sending feedback ' + err);
      });

      this.feedback = '';
    } else {
      this.openSnackBar('Enter something in the feedback field');
    }
  }
}
