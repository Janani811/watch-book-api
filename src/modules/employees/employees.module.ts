import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'employees', method: RequestMethod.GET });
  }
}
