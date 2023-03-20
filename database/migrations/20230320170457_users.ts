/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('us_id').primary();
    table.string('us_name', 255).notNullable();
    table.string('us_email', 255).notNullable();
    table.string('us_password', 255);
    table.string('us_password_salt', 255);
    table.integer('us_org_id').unsigned();
    table.foreign('us_org_id').references('org_id').inTable('organisations');
    table.tinyint('us_active').defaultTo(0);
    table.integer('us_type', 4);
    table.tinyint('us_is_deleted').defaultTo(0);
    table.string('us_verification_token ', 255);
    table.text('us_address');
    table.string('us_phone_no', 50);
    table.timestamp('us_created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
