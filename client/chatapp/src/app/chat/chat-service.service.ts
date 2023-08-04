import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private socket = io('http://localhost:3000');
  constructor() { }

  joinRoom(data:any){
    this.socket.emit('join', data);
  }

  newUserJoined(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new user joined', (data:any)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(data:any){
    this.socket.emit('leave', data);
  }

  userLeftRoom(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('left room', (data:any)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  sendMessage(data:any){
    this.socket.emit('message', data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new message', (data:any)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

}
