

export interface Quiz{
   title:string,
    description:string,
    courseId:number,
  questions:question
}

export interface question{
    questionText:string,
    answerText:string
}