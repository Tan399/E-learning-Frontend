import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/loading.component';


@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private dialogRef: MatDialogRef<LoadingComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  show(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoadingComponent, {
        disableClose: true, 
        panelClass: 'loading-modal', 
      });
    }
  }

  hide(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
