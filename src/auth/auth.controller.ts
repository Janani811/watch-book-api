import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  findAll() {
    return 'Hello World!';
  }

  @Post('signup')
  signup(@Body() dto: SignUpDto, @Req() request: Request) {
    console.log(dto, request);
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto, @Req() request: Request) {
    const { user, token }: any = await this.authService.signin(dto);
    request.user = user;
    console.log(request);
    return { token };
  }
}
