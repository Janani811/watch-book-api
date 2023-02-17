import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getprofile')
  getProfile(@Request() req, @Response() res) {
    res.status(200).json({
      status: true,
      user: {
        ...req.user,
      },
    });
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto, @Response() res) {
    try {
      await this.authService.signup(dto);
      return res.json({ status: 200, message: 'Signup Successfully completed' });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto, @Request() req, @Response() res) {
    try {
      const { user, jwtToken }: any = await this.authService.signin(dto, res);
      req.user = user;
      return res.json({ status: 200, message: 'Signed In Successfully', jwtToken, user });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }
}
