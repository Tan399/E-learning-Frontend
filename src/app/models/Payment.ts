export interface Payment{

  amount:number| undefined;

 userId:number;

 courseId:number|undefined;
 paymentDate:string;
}
export interface Payment2{

  paymentAmount:number;

  studentName:string;
  courseCategory:string;
 courseName:string;
 paymentDate:string;
}