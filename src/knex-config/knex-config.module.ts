import { Module } from '@nestjs/common';

import { config } from 'dotenv';
import { DBConfigModule } from './db.module';

config();

@Module({
  imports: [DBConfigModule.forRoot()],
  providers: [],
  exports: [],
  controllers: [],
})
export class KnexConfigModule {}
