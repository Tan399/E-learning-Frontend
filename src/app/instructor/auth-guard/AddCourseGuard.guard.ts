import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddCourseComponent } from '../add-course/add-course.component';
import { ConfirmDialogComponent } from '../../auth/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AddCourseGuard implements CanDeactivate<AddCourseComponent> {

  dialog: MatDialog = inject(MatDialog);

  canDeactivate(component: AddCourseComponent): Observable<boolean> | boolean {
    if (component.courseForm.dirty) {
      return this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Unsaved Changes',
          message: 'You have unsaved changes. Do you really want to leave this page?'
        }
      }).afterClosed();
    }
    return true;
  }
}
