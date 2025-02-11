export interface course2{
  courseid: number,
  coursename: string,
  description: string,
  level: string,
  categoryId: number,
  price: number,
  videoUrl:string,
  enrolledCount:number,
  courseImage:string | ArrayBuffer | null,
  duration:number
}

export interface InitialFormValue{
  courseid: number,
  coursename: string,
  description: string,
  level: string,
  price: number,
  videoUrl:string,
  duration:number
}

