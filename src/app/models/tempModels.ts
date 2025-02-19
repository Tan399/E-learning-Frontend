export interface Feedback2 {
  feedback: string;
  courseId: number;
  userId: number;
}

export interface Answer {
  answerId: number;
  answerText: string;
  correct: boolean;
}

export interface Question {
  questionId: number;
  questionText: string;
  correctAnswerIndex: number;
  answers: Answer[];
}

export interface Quiz {
  quizId: number;
  title: string;
  description: string;
  questions: Question[];
  quizAttempts: QuizAttempt[];
}

export interface QuizAttempt {
  userId: number;
  quizId: number;
  score: number;
}

export interface InitialFormValue2{
  firstname:string;
  lastname:string;
  gender:string;

}