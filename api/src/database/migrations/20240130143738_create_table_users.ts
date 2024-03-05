import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   return knex.schema.createTable('users', function (table) {
      table.increments('id');

      table.string('email').notNullable().unique();
      table.string('name').notNullable();
      table.string('password').notNullable().unique();

      table.integer('id_permission').references('id').inTable('permissions').onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at');
   });
}


export async function down(knex: Knex): Promise<void> {
   return knex.schema.dropTable('users');
}
