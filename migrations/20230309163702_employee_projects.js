/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employee_projects', function (table) {
    table.increments('empr_id').primary();

    table.integer('empr_pro_id').unsigned();
    table.foreign('empr_pro_id').references('pro_id').inTable('projects');

    table.integer('empr_emp_id').unsigned();
    table.foreign('empr_emp_id').references('emp_id').inTable('employees');

    table.integer('empr_org_id').unsigned();
    table.foreign('empr_org_id').references('org_id').inTable('organisations');

    table.integer('empr_assigned_by').unsigned();
    table.foreign('empr_assigned_by').references('us_id').inTable('users');

    table.tinyint('empr_emp_active').defaultTo(1);
    table.timestamp('empr_assigned_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('employee_projects');
};
