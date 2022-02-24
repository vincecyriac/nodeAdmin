import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  socket: any;

  constructor() {

    this.socket = io.connect('http://localhost:3001');
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data: any) => {
        subscriber.next(data);
      })
    })
  }
  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
  //stop listening to the event
  stopListening(eventname: string) {
    this.socket.removeListener(eventname);
  }
}
