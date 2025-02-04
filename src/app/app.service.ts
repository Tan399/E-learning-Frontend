import { inject, Injectable } from "@angular/core";
import { InstructorService } from "./instructor/instructor.service";
import { categories } from "./models/categories";


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