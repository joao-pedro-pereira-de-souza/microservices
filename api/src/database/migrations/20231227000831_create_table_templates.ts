import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   return knex.schema.createTable('templates', (table) => {
      table.increments('id');

      table.string('template_url').notNullable();
      table.string('title').notNullable();
      table.string('image_url').notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at');
   })
}


export async function down(knex: Knex): Promise<void> {
   return knex.schema.dropTable('templates');
}
