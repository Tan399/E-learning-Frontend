import { EventEmitter, Injectable } from '@angular/core';


export interface LoggedUser{
id:number,
role:string  
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string='' ;
loggedUser:LoggedUser={
  id:0,
  role:""
}
  constructor() {}


  Logged:EventEmitter<boolean>=new EventEmitter();

  login(role: string, token: string,id:number) {
    
    this.loggedUser.role=role;
    this.loggedUser.id=id;
    console.log(this.loggedUser)
    this.userRole = role; 
    localStorage.setItem('userRole', role);
    this.userRole = role; 
    localStorage.setItem('token', token); 
    this.Logged.emit(true);
  }
  
  

  logout() {
    this.userRole = "";
    this.loggedUser.role=""
    this.loggedUser.id=0
    // localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    this.Logged.emit(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return this.loggedUser.role|| '';
  }

  isUserAuthenticated(): boolean {
    return this.loggedUser.role === 'USER';
  }

  isInstructorAuthenticated(): boolean {
    return this.loggedUser.role === 'INSTRUCTOR';
  }
}
