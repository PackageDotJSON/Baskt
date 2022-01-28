import { SOCKET_URL } from './socket-url';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Imports
import { SocketService } from './socket.service';

const socketConfig: SocketIoConfig = { url: SOCKET_URL, options: {} };
@NgModule({
  imports: [CommonModule, SocketIoModule.forRoot(socketConfig)],
  providers: [SocketService],
})
export class SocketModule {}
