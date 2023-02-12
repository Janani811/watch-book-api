/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type UserCreateInput = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    const hashPass = await bcrypt.hash(dto.password, 10);

    try {
      const user: UserCreateInput = await this.prisma.users.create({
        data: {
          email: dto.email,
          password: hashPass,
          first_name: dto.firstName,
          last_name: dto.lastName,
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    // find the user by email
    const user: any = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('User Not Found');

    // compare password
    const isMatch = await bcrypt.compare(dto.password, user.password);

    // if password incorrect throw exception
    if (!isMatch) throw new ForbiddenException('Credentials incorrect');
    delete user.password;
    const token = await this.signInToken(user);
    return { user, token };
  }

  async signInToken(user): Promise<{ jwtToken: string }> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(user, {
      expiresIn: '8h',
      secret: secret,
    });

    return {
      jwtToken: token,
    };
  }
}
