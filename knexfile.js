// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      name: 'wbconnection',
      host: '127.0.0.1',
      user: 'root',
      port: 3306,
      password: 'password',
      database: 'watchbook',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
