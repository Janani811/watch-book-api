/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('leave', function (table) {
    table.increments('le_id').primary();

    table.integer('le_emp_id').unsigned();
    table.foreign('le_emp_id').references('emp_id').inTable('employees');

    table.integer('le_org_id').unsigned();
    table.foreign('le_org_id').references('org_id').inTable('organisations');

    table.integer('le_applied_to').unsigned();
    table.foreign('le_applied_to').references('us_id').inTable('users');

    table.text('le_reason');
    table.dateTime('le_from_date');
    table.dateTime('le_to_date');
    table.integer('le_type').unsigned();
    table.foreign('le_type').references('lt_id').inTable('leave_type');
    table.tinyint('le_status').defaultTo(0);
    table.timestamp('le_created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('leave');
};
