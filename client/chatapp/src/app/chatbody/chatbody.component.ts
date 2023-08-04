import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatServiceService } from '../chat/chat-service.service';

@Component({
selector: 'app-chatbody',
templateUrl: './chatbody.component.html',
styleUrls: ['./chatbody.component.css']
})
export class ChatbodyComponent implements OnInit{
user:String = '';
room:String = '';
messageText:String = '';
messageArray:Array<{user:String,message:String}> = [];

constructor(private router : Router,private _chatService : ChatServiceService){
this._chatService.newUserJoined()
.subscribe(data=> this.messageArray.push(data));


this._chatService.userLeftRoom()
.subscribe(data=>this.messageArray.push(data));

this._chatService.newMessageReceived()
.subscribe(data=>this.messageArray.push(data));
}


ngOnInit(): void {

}




join(){
this._chatService.joinRoom({user:this.user, room:this.room});
}

leave(){
this._chatService.leaveRoom({user:this.user, room:this.room});
}

sendMessage()
{
this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
}
}
