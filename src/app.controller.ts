import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('list/:id')
  listOfUsers(@Param('id') id: string): any {
    return this.appService.listOfUsers(id);
  }
}
