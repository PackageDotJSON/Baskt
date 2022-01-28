import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService implements OnDestroy {
  constructor(private socket: Socket) {
    this.connectSocket();
  }

  private connectSocket() {
    this.socket.connect();
  }

  sendMessage(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
  receivedJustSingleValue(eventName: string): Promise<any> {
    return this.socket.fromOneTimeEvent(eventName);
  }
  receiveDataStream(eventName: string): Observable<any> {
    return this.socket.fromEvent(eventName);
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
