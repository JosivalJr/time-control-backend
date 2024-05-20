import type { Knex } from 'knex';
import { ETableNames } from '../ETables';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.employee, (table) => {
      table.uuid('id').primary().index().notNullable();
      table
        .string('first_name')
        .index()
        .notNullable()
        .checkLength('<=', 30)
        .checkLength('>=', 3);

      table
        .string('last_name')
        .index()
        .notNullable()
        .checkLength('<=', 30)
        .checkLength('>=', 3);

      table
        .string('email')
        .index()
        .notNullable()
        .checkLength('<=', 30)
        .checkLength('>=', 5)
        .unique();

      table.string('password').index().notNullable().checkLength('>=', 6);
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
