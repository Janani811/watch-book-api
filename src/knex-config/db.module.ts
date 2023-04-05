import { DynamicModule, Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { config } from 'dotenv';

config();

@Module({})
export class DBConfigModule {
  public static forRoot(): DynamicModule {
    return {
      module: DBConfigModule,
      imports: [
        KnexModule.forRoot({
          config: {
            client: 'mysql',
            useNullAsDefault: true,
            connection: {
              host: process.env.DB_HOST,
              port: +process.env.DB_PORT,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_DATABASE,
              charset: 'utf8',
            },
          },
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
