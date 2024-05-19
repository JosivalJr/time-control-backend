import type { Knex } from 'knex';
import { ETableNames } from '../ETables';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.timeControl, (table) => {
      table.uuid('id').primary().index().notNullable();
      table
        .uuid('employee_id')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.employee)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('control_type', 30)
        .checkLength('<=', 30)
        .index()
        .notNullable();
      table.date('control_time').index().notNullable();
      table.date('created_at').index().notNullable().defaultTo(new Date());
      table.date('updated_at').index().notNullable().defaultTo(new Date());

      table.comment('Table used to store time control datas');
    })
    .then(() => console.info(`# Created table ${ETableNames.timeControl}.`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.timeControl).then(() => {
    console.info(`# Dropped table ${ETableNames.timeControl}.`);
  });
}
