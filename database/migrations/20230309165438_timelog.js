/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('time_log', function (table) {
    table.increments('tl_id').primary();

    table.integer('tl_emp_id').unsigned();
    table.foreign('tl_emp_id').references('emp_id').inTable('employees');

    table.integer('tl_org_id').unsigned();
    table.foreign('tl_org_id').references('org_id').inTable('organisations');

    table.integer('tl_pro_id').unsigned();
    table.foreign('tl_pro_id').references('pro_id').inTable('projects');

    table.text('tl_description');
    table.dateTime('tl_date');
    table.time('tl_from');
    table.time('tl_to');
    table.integer('tl_type').unsigned();
    table.foreign('tl_type').references('tt_id').inTable('timelog_type');
    table.timestamp('tl_created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('time_log');
};
