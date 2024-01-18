import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../database/entities/*.entity.{js,ts}'],
  seeds: [__dirname + '/../database/seeds/*{.ts,.js}'],
  ssl: process.env.SSL == 'true',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true, // do not set it true in production application
};

export const dataSource = new DataSource(dataSourceOptions);

export default dataSource.initialize();
