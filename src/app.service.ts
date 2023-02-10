import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma/db';

@Injectable()
export class AppService {
  users = ['J', 'E', 'V', 'S'];
  getHello(): string {
    return 'Hello World';
  }
  async listOfUsers(id: any): Promise<any> {
    await prisma.user.create({
      data: {
        name: 'johndoe',
        email: 'johndoe@prisma.io',
        posts: {
          create: { title: 'How are you' },
        },
      },
    });
    return 'success';
  }
}
