import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket;


  constructor() {
    this.socket = io('http://localhost:3000');
  }


  sendMessage(messageKey: string, value: any) {
    this.socket.emit(messageKey, 'new order created ' + value);
  }
  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('new-order', (message) => {
        observer.next(message);
      });
    });
  }
}
