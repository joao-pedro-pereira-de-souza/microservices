import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   return knex.schema.createTable('permissions', function (table) {
      table.increments('id');

      table.string('title').notNullable();
      table.integer('number').notNullable().unique();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at');
   });
}


export async function down(knex: Knex): Promise<void> {
   return knex.schema.dropTable('permissions');
}
