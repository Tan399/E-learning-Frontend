import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormGuard implements CanDeactivate<RegisterComponent> {

    

    dialog: MatDialog=inject(MatDialog)
    canDeactivate(component: RegisterComponent): Observable<boolean> | boolean {
        if (component.registerForm.dirty) {
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