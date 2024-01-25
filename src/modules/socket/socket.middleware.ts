import { Socket } from 'socket.io';
import { WsJwtGuard } from './socket-jwt.guard';
import { NextFunction } from 'express';

export const WebSocketAuthMiddleware = () => {
  return (client: Socket, next: NextFunction) => {
    try {
      WsJwtGuard.validateToken(client);
      next();
    } catch (e) {
      next(e);
    }
  };
};
