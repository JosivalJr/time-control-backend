import type { Knex } from 'knex';
import { ETableNames } from '../ETables';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.employee, (table) => {
      table.uuid('id').primary().index().notNullable();
      table
        .string('first_name', 30)
        .checkLength('<=', 30)
        .index()
        .notNullable();
      table.string('last_name', 30).checkLength('<=', 40).index().notNullable();
      table.string('email', 40).checkLength('<=', 40).index().notNullable();
      table.string('password').index().notNullable();
      table.date('created_at').index().notNullable().defaultTo(new Date());
      table.date('updated_at').index().notNullable().defaultTo(new Date());

      table.comment('Table used to store employee data');
    })
    .then(() => console.info(`# Created table ${ETableNames.employee}.`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.employee).then(() => {
    console.info(`# Dropped table ${ETableNames.employee}.`);
  });
}
