/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employees', function (table) {
    table.increments('emp_id').primary();
    table.integer('emp_us_id').unsigned();
    table.foreign('emp_us_id').references('us_id').inTable('users');
    table.integer('emp_org_id').unsigned();
    table.foreign('emp_org_id').references('org_id').inTable('organisations');
    table.integer('emp_role', 4);
    table.integer('emp_created_by').unsigned();
    table.foreign('emp_created_by').references('us_id').inTable('users');
    table.timestamp('emp_created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('employees');
};
