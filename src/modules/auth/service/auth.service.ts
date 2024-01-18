/* eslint-disable prettier/prettier */
import {
  Injectable,
  ForbiddenException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto, UpdateUserDto } from '../dto/auth.dto';
import { Users } from 'src/database/entities/users.entity';

import { Organisations } from 'src/database/entities/oraganisation.entity';
import { UsersRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private usersRepository: UsersRepository,
  ) {}

  async fetchProfile(id: number) {
    try {
      const user: Users & Organisations = await this.usersRepository.findUserWithOrganisation({
        id,
      });
      if (!user) {
        return null;
      }
      delete user.us_password;
      delete user.us_password_salt;
      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async signup(dto: SignUpDto) {
    let org: any = null;

    const existOrg = await this.usersRepository.findOneOrganisation({ org_email: dto.email });

    if (existOrg) {
      throw new HttpException('Organisation email already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      org = await this.usersRepository.createOrganisation({
        org_name: dto.orgName,
        org_address: dto.orgAddress,
        org_email: dto.email,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(dto.password, 10);
      await this.usersRepository.createUser({
        us_name: dto.name,
        us_email: dto.email,
        us_password: hashPass,
        us_password_salt: salt,
        us_org_id: org.raw[0].org_id,
        us_type: 1,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(dto: SignInDto) {
    let user: Users = await this.usersRepository.findUserWithOrganisation({ email: dto.email });

    if (!user) {
      throw new ForbiddenException('User not found');
    }
    // compare password
    const isMatch = await bcrypt.compare(dto.password, user.us_password);

    if (!isMatch) throw new ForbiddenException('Your Credentials are incorrect');
    delete user.us_password;
    delete user.us_password_salt;
    const jwtToken = await this.signInToken(user);
    return { user: user, jwtToken };
  }

  async signInToken(user: Users): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    try {
      const token = await this.jwtService.sign(
        { ...user },
        {
          secret: secret,
        },
      );
      return token;
    } catch (e) {
      throw new ForbiddenException('Authentication failed');
    }
  }

  async editProfile(id: number, data: UpdateUserDto) {
    try {
      const user = await this.usersRepository.updateUser(id, data);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
