import { SafeUrl } from "@angular/platform-browser"

export interface course {
  courseid: number,
  name: string,
  description: string,
  image: SafeUrl | null,
  price: string,
  level: string,
  enrolled: number,
  category: string,
  duration: number
}

export interface courseDetails {
  category: string,
  courseImage: SafeUrl | null,
  courseid: number,
  coursename: string,
  description: string,
  duration: number,
  enrolledCount: number,
  level: string,
  price: number,
  videoUrl: string
}
export interface courseDetails2 {
  categoryId: number,
  courseImage: SafeUrl | null,
  courseid: number,
  coursename: string,
  description: string,
  duration: number,
  instructorId:number
  enrolledCount: number,
  level: string,
  price: number,
  videoUrl: string
}


export interface MyCourse{
    id:number,
    status:string,
    courseId:number,
    userId:number
    }