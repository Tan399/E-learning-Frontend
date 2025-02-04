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