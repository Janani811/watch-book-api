/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel() private readonly knex: Knex,
  ) {}

  async fetchProfile(id: number) {
    try {
      const user: any = await this.knex
        .table('users')
        .join('organisations', 'org_id', 'us_org_id')
        .where('us_id', id)
        .column('*')
        .first();
      if (!user) {
        throw new ForbiddenException('User not found');
      }
      delete user.us_password;
      return { user };
    } catch (e) {
      console.log(e);
    }
  }

  async signup(dto: SignUpDto) {
    let org;
    let newUser;

    const existOrg = await this.knex.table('organisations').where('org_email', dto.email);

    if (existOrg.length) {
      throw new HttpException('Organisation email already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      org = await this.knex.table('organisations').insert({
        org_name: dto.orgName,
        org_address: dto.orgAddress,
        org_email: dto.email,
        org_details: '',
        org_phone_no: '',
      });
      console.log(org);
    } catch (e) {
      throw new ForbiddenException('Something went wrong');
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(dto.password, 10);
      newUser = await this.knex.table('users').insert({
        us_name: dto.name,
        us_email: dto.email,
        us_password: hashPass,
        us_password_salt: salt,
        us_org_id: org,
        us_type: 1,
        us_verification_token: '',
        us_address: '',
        us_phone_no: '',
      });
      delete newUser.us_password;
      return { ...newUser };
    } catch (e) {
      throw new ForbiddenException('Something went wrong');
    }
  }

  async signin(dto: SignInDto) {
    const user: any = await this.knex.table('users').where('us_email', dto.email).first();

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // compare password
    const isMatch = await bcrypt.compare(dto.password, user.us_password);
    // console.log(isMatch, user.us_password);
    // if password incorrect throw exception
    if (!isMatch) throw new ForbiddenException('Your Credentials are incorrect');
    delete user.us_password;
    const jwtToken = await this.signInToken(user);
    return { user, jwtToken };
  }

  async signInToken(user): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    try {
      const token = await this.jwtService.sign(
        { ...user },
        {
          expiresIn: '8h',
          secret: secret,
        },
      );
      return token;
    } catch (e) {
      throw new ForbiddenException('Authentication failed');
    }
  }

  async editProfile(data: any) {
    await this.knex.table('users').where({ us_id: data.userId }).update({
      us_name: data.name,
      us_email: data.email,
    });
    await this.knex.table('organisations').where({ org_id: data.orgId }).update({
      org_name: data.orgName,
      org_address: data.orgAddress,
      org_email: data.email,
      org_phone_no: data.phone,
    });

    const [user]: any = await this.knex
      .table('users')
      .join('organisations', 'users.us_org_id', '=', 'organisations.org_id')
      .where('us_id', data.userId)
      .select('*');
    delete user.password;
    return { user };
  }
}
