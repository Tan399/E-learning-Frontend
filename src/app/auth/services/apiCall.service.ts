import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { res } from "src/app/models/LoginResponse";
import { User } from "src/app/models/User";
import { User2 } from "src/app/models/User2";




  


@Injectable({
    providedIn:"root"
})
export class ApiCall{
http:HttpClient=inject(HttpClient);
baseUrl:string="http://localhost:8080"
    constructor() { 

        
    }

    register(user:User2,role:string){
       return this.http.post(`${this.baseUrl}/register/${role.toUpperCase()}`,user)


    }


    logginToServer(email:string,password:string):Observable<res>{
       
        return this.http.post<res>(`${this.baseUrl}/login`,{email:email,password:password})
    }
}