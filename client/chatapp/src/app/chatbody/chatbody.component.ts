import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatServiceService } from '../chat/chat-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbody',
  templateUrl: './chatbody.component.html',
  styleUrls: ['./chatbody.component.css']
})
export class ChatbodyComponent implements OnInit, OnDestroy {
  user: String = '';
  room: String = '';
  messageText: String = '';
  messages: Array<{ user: String, message: String }> = [];
  private messageSubscription: Subscription = new Subscription;

  constructor(private router: Router, private _chatService: ChatServiceService) {
    this._chatService.newUserJoined()
      .subscribe(data => this.messages.push(data));

    this._chatService.userLeftRoom()
      .subscribe(data => this.messages.push(data));

    this.messageSubscription = this._chatService.newMessageReceived()
      .subscribe(data => this.messages.push(data));
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    const data = { user: this.user, room: this.room, message: this.messageText };
    this._chatService.sendMessage(data);
    this.messageText = ''; // Gönderdikten sonra mesaj alanını temizleme işlemi
  }

  join() {
    this._chatService.joinRoom({ user: this.user, room: this.room });
  }

  leave() {
    this._chatService.leaveRoom({ user: this.user, room: this.room });
  }
}
