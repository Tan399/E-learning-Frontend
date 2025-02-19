import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, Message } from '../services/ChatService';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { UserService } from 'src/app/Services/user.service';
import { User3 } from 'src/app/models/User';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-group-chat-dialog',
  templateUrl: './group-chat-dialog.component.html',
  styleUrls: ['./group-chat-dialog.component.css']
})
export class GroupChatDialogComponent implements OnInit {
  messages: Message[] = [
  ];

  @ViewChild("container") view!:ElementRef;
  newMessage: string = '';
  username: string = ''; 
 

  constructor(private userService:UserService,public dialogRef: MatDialogRef<GroupChatDialogComponent>) {
    this.userService.getUserById().subscribe((response: User3)=>{
      this.username = response.firstname+" "+response.lastname;
    })
  }



  private stompClient: any;

  ngOnInit() {
    (window as any).global = window;
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/ws'); 
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/chatroom/public', (message:any) => {
        this.showMessage(JSON.parse(message.body));
      });
    },()=>{
      console.log("error connecting!");
    });
  }

  sendMessage() {
    this.stompClient.send('/app/message', {}, JSON.stringify({name:this.username, content: this.newMessage }));
    this.newMessage = ''; 
  }
  showMessage(message: Message) {
    this.messages = [...this.messages, message];
    setTimeout(() => {
      const newMessageElement = this.view.nativeElement.querySelector(`.message:last-child`);
      if (newMessageElement) {
        newMessageElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  close() {
    this.dialogRef.close()
  }
}