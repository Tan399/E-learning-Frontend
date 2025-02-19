import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupChatDialogComponent } from '../group-chat-dialog/group-chat-dialog.component';

@Component({
  selector: 'app-chat-icon',
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.css']
})
export class ChatIconComponent {
  constructor(public dialog: MatDialog) {}


  ngOnInit() {
    (window as any).global = window;
  
  }
  openChat(): void {
    this.dialog.open(GroupChatDialogComponent,{
      width: '600px',
      height: '600px'
    });
  }
}