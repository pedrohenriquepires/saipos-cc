import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', table => {
    table.string('id', 36).primary().notNullable().unique()
    table.string('description', 255).notNullable()
    table.enum('status', ['1', '2']).notNullable()
    table.string('ownerName', 255).notNullable()
    table.string('ownerEmail', 255).notNullable()
    table.string('createdAt', 255).notNullable()
    table.integer('refusedCount', 255).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks')
}