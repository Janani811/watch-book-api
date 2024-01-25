import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WebSocketAuthMiddleware } from '../socket.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { ConfigService } from '@nestjs/config';
import { WsJwtGuard } from '../socket-jwt.guard';

@WebSocketGateway({
  namespace: '/events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  users: any[] = [];

  constructor(private authService: AuthService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }
  afterInit(client: Socket) {
    client.use(WebSocketAuthMiddleware() as any);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(body, client.id);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    this.setConnectedUserData(client);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.removeConnectedUserData(client);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket): void {
    console.log(`Client ${client.id} created and joined room: ${roomName}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket): void {
    client.join(roomName);
    console.log(`Client ${client.id} joined room: ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket): void {
    client.leave(roomName);
    console.log(`Client ${client.id} left room: ${roomName}`);
  }

  @SubscribeMessage('sendMessageToRoom')
  handleSendMessageToRoom(
    @MessageBody() data: { roomName: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { roomName, message } = data;
    this.server.to(roomName).emit('message', { from: client.id, message });
  }

  sendMessageToClient(socketId: string, message: string, user?: any) {
    this.server.to(socketId).emit('privateMessage', {
      socketId: socketId, // You can use any identifier for Postman
      message,
      user: user,
    });
  }

  @SubscribeMessage('sendThemeChange')
  async sendThemeChangeTo(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    let decoded = await WsJwtGuard.validateToken(client);

    let index = this.findUserById(decoded.us_id);

    if (index != -1) {
      let user = this.users[index];
      if (user) {
        let sockets = user.sockets.filter((id: string) => id != client.id);
        this.emitEventByIds('theme-changed', sockets, { theme: data?.theme || '' });
      }
    }
  }

  async setConnectedUserData(client: Socket) {
    try {
      let decoded = await WsJwtGuard.validateToken(client);

      let index = this.findUserById(decoded.us_id);

      if (index == -1) {
        this.users.push({ us_id: decoded.us_id, org_id: decoded.org_id, sockets: [client.id] });
      } else {
        let user = this.users[index];
        if (user) {
          user.sockets = [...user.sockets, client.id];
          this.users.splice(index, 1, user);
        }
      }

      this.sendMessageToClient(client.id, 'Socket connection established');
    } catch (err) {
      client.disconnect();
      console.error(err.message);
    }
  }
  async removeConnectedUserData(client: Socket) {
    try {
      let decoded = await WsJwtGuard.validateToken(client);

      let index = this.findUserById(decoded.us_id);

      if (index >= 0) {
        let user = this.users[index];
        if (user) {
          let sockets = user.sockets.filter((socket: string) => socket != client.id);
          if (sockets.length) {
            user.sockets = [...sockets];
            this.users.splice(index, 1, user);
          } else {
            this.users.splice(index, 1);
          }
        }
      }
      this.sendMessageToClient(client.id, 'You are disconnected');
    } catch (err) {
      client.disconnect();
      console.error(err.message);
    }
  }

  findUserById(userId: number) {
    return this.users.findIndex((user) => user.us_id == userId);
  }

  emitEventByIds(eventName: string, sockets: string[], data: any = null) {
    console.log(sockets);
    if (sockets.length > 0) {
      sockets.map((id: string) => {
        this.server.to(id).emit(eventName, data);
      });
    }
  }
}
