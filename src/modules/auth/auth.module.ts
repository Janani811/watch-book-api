import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from '../../common/middleware/auth.middleware';
import { AuthService } from './service/auth.service';
import { Users } from 'src/database/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisations } from 'src/database/entities/oraganisation.entity';
import { UsersRepository } from './repository/user.repository';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '8h' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([Users, Organisations]),
  ],
  controllers: [AuthController],
  providers: [JwtService, AuthService, AuthMiddleware, UsersRepository],
  exports: [JwtService, AuthService, AuthMiddleware],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'auth/getprofile', method: RequestMethod.GET },
        { path: 'auth/edit-profile', method: RequestMethod.PUT },
      );
  }
}