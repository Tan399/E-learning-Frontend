import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstructorService } from '../../Services/instructor.service';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { course2 } from 'src/app/models/course2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogueComponent } from '../deletedelete-dialogue/delete-dialogue.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
})
export class ManageCoursesComponent {
  courses:course2[] = [];
  _snackBar: MatSnackBar = inject(MatSnackBar);
  instructorService: InstructorService=inject(InstructorService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<course2>();
  displayedColumns: string[] = ['coursename', 'description', 'level', 'actions'];

  constructor(private dialog: MatDialog) {
      
  }





  ngOnInit() {
    this.loadCourses();
    
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, 1500)
  }

  loadCourses(){
    this.instructorService.getInstructorCourses().subscribe((data)=>{
      this.dataSource.data=data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    },(err)=>{
   
    })
  }

  onEdit(course: course2) {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '600px',
      data: { ...course }, 
    });

 

    

    dialogRef.afterClosed().subscribe((result) => {
      this.loadCourses()
      if (result) {
        const index = this.courses.findIndex((c) => c.courseid === result.courseid);
        if (index !== -1) {
          this.courses[index] = result;
        }
     
      }
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: course2, filter: string) => {
      return data.coursename.toLowerCase().includes(filter) || 
             data.description.toLowerCase().includes(filter) || 
             data.level.toLowerCase().includes(filter);
    };
  }

 

  onView(course: course2) {
    this.dialog.open(CourseDetailsComponent, {
      width: '600px',
      data: { ...course }, 
    });
  }

  deleteCourse(courseId: number) {
    const dialogRef = this.dialog.open(DeleteDialogueComponent, {
      data: courseId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.instructorService.deleteCourse(courseId).subscribe({
          next: () => {
            this.openSnackBar('Course deleted successfully!');
            this.loadCourses();
          },
          error: (err) => {
            console.error('Error deleting course:', err);
            this.openSnackBar('Failed to delete the course. Please try again.');
          }
        });
      }
    });
    }

  }



