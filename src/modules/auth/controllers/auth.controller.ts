import { Body, Controller, Get, Post, Put, Request, Response } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto, SignUpDto, UpdateUserDto } from '../dto/auth.dto';
import { EventsGateway } from 'src/modules/socket/socket-gateways/events.gateway';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private eventsGateway: EventsGateway) {}

  @Get('getprofile')
  async getProfile(@Request() req, @Response() res) {
    try {
      const user = await this.authService.fetchProfile(req.user.us_id);
      res.status(200).json({
        status: true,
        user: {
          ...user,
        },
      });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto, @Response() res) {
    try {
      await this.authService.signup(dto);
      return res.json({ status: 200, message: 'Signup Successfully completed' });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }

  @Post('login')
  async signin(@Body() dto: SignInDto, @Request() req, @Response() res) {
    try {
      const { user, jwtToken }: any = await this.authService.login(dto);
      req.user = user;
      return res.json({ status: 200, message: 'Signed In Successfully', jwtToken, user });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }

  @Put('edit-profile')
  async editProfile(@Body() dto: UpdateUserDto, @Request() req, @Response() res) {
    try {
      const user = await this.authService.editProfile(req.user.us_id, dto);
      return res.json({ status: 200, message: 'Profile updated successfully', user });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }
  @Post('send-message')
  async sendMessage(@Body() dto: any, @Request() req, @Response() res) {
    try {
      this.eventsGateway.sendMessageToClient(dto.id, dto.message);
      return res.json({ status: 200, message: 'Profile updated successfully' });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }
}
