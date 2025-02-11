

export interface Quiz{
   title:string,
    description:string,
    courseId:number,
  questions:question
}
export interface Quiz2{
   title:string,
    description:string,
    courseId:number,
  questions:questions[]
}

export interface question{
    questionText:string,
    answerText:string
}
export interface questions{
    questionText:string,
    answers:answer[]
}

export interface answer{
  answerText:string
}




