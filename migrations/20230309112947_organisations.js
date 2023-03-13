/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('organisations', function (table) {
    table.increments('org_id').primary();
    table.string('org_name', 255).notNullable();
    table.string('org_email', 255).notNullable();
    table.text('org_address');
    table.text('org_details');
    table.string('org_phone_no', 50);
    table.timestamp('org_created_at').defaultTo(knex.fn.now());
    table.timestamp('org_updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('organisations');
};
