import { inject, Injectable } from "@angular/core";
import { categories } from "../models/categories";
import { InstructorService } from "./instructor.service";



@Injectable({
    providedIn:"root"
})
export class AppService{
    categories!:categories[]
    instructorService:InstructorService=inject(InstructorService)

    constructor(){
        this.instructorService.getCategories().subscribe((data)=>{
            this.categories=data
        })
        
    }





}