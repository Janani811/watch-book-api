/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
      const organisation: any = await this.prisma.org.create({
        data: {
          org_name: dto.orgName,
          org_address: dto.orgAddress,
        },
      });
      const user: any = await this.prisma.orgUsers.create({
        data: {
          oga_email: dto.email,
          oga_password: hashPass,
          oga_name: dto.name,
          oga_user_type: 1,
          oga_org_id: organisation.org_id,
        },
      });

      delete user.password;
      return { ...organisation, ...user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto, res) {
    const user: any = await this.prisma.orgUsers.findUnique({
      where: {
        oga_email: dto.email,
      },
      include: {
        organisation: true,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // compare password
    const isMatch = await bcrypt.compare(dto.password, user.oga_password);

    // if password incorrect throw exception
    if (!isMatch) throw new ForbiddenException('Your Credentials are incorrect');
    delete user.password;
    const jwtToken = await this.signInToken(user);
    return { user, jwtToken };
  }

  async signInToken(user): Promise<string> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(user, {
      expiresIn: '8h',
      secret: secret,
    });

    return token;
  }
}
