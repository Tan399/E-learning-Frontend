import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { WatchCourseComponent } from './watch-course/watch-course.component';
import { UserScoresComponent } from './user-scores/user-scores.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path: 'watch-course/:id', component: WatchCourseComponent },
  { path: 'quiz-scores', component: UserScoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
