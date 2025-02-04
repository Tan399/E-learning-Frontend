import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.css']
})
export class DeleteDialogueComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}