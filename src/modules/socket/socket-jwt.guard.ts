import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() == 'ws') return true;

    const client: Socket = context.switchToWs().getClient();

    try {
      WsJwtGuard.validateToken(client);
    } catch (error) {
      throw new Error(error);
    }

    return true;
  }

  static validateToken(client: Socket) {
    const jwtService = new JwtService();
    const config = new ConfigService();
    const authHeaders = client.handshake.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      let decoded = null;
      try {
        decoded = jwtService.verify(token, {
          secret: config.get('JWT_SECRET'),
        });
        return decoded;
      } catch (e) {
        throw new Error('Unauthenticated socket connection');
      }
    } else {
      throw new Error('Invalid socket authentication token');
    }
  }
}
