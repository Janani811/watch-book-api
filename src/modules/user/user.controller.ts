import { Body, Controller, Post } from '@nestjs/common';

import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { Users } from '../../database/entities/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
