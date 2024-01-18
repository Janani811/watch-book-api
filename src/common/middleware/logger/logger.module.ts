import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
