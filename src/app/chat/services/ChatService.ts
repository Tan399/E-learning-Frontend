import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';

export interface Message {
  name: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: Message[] = [];
  private messagesSubject = new Subject<Message[]>();
  

  getMessages() {
    return this.messagesSubject.asObservable();
  }




}