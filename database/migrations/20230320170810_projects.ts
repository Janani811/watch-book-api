/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('projects', function (table) {
    table.increments('pro_id').primary();
    table.string('pro_name', 255).notNullable();
    table.integer('pro_org_id').unsigned();
    table.foreign('pro_org_id').references('org_id').inTable('organisations');
    table.integer('pro_created_by').unsigned();
    table.foreign('pro_created_by').references('us_id').inTable('users');
    table.text('pro_details');
    table.string('pro_estimation_time', 30);
    table.tinyint('pro_active').defaultTo(0);
    table.tinyint('pro_is_deleted').defaultTo(0);
    table.timestamp('pro_created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('projects');
};
