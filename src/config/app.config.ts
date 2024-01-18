require('dotenv').config();

export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  host: process.env.DB_HOST,
  port: +process.env.PORT,
  db_port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
