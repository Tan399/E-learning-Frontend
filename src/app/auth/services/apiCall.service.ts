import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/User";
import { User2 } from "../register/register.component";


export interface res{
    token:string,
    role:string,
    id:number
  }
  


@Injectable({
    providedIn:"root"
})
export class ApiCall{
http:HttpClient=inject(HttpClient);
    constructor() { 

        
    }

    register(user:User2,role:string){
       return this.http.post(`http://localhost:8080/register/${role.toUpperCase()}`,user)


    }


    logginToServer(email:string,password:string):Observable<res>{
       
        return this.http.post<res>('http://localhost:8080/login',{email:email,password:password})
    }
}