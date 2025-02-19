import { SafeUrl } from "@angular/platform-browser";

export interface User{
   userType:string;
    firstname:string;
     lastname:string;
    email:string;
     gender:string;
}

export interface User3{
   firstname:string;
     lastname:string;
    email:string;
     gender:string;
     image: Blob;
     userType:string
}
export interface UserUpdate{
   firstname:string;
     lastname:string;
     gender:string;
  
}



