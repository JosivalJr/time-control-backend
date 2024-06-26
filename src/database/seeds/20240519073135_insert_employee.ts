import { Knex } from 'knex';
import { ETableNames } from '../ETables';
import crypto from 'crypto';
import { PasswordCrypto } from '../../services';

export async function seed(knex: Knex): Promise<void> {
  const [{ count }] =
    await knex(ETableNames).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  let employeeList = [];
  for (let employee of employeeToInsert) {
    const id = crypto.randomUUID();
    const password = await PasswordCrypto.hashPassword(employee.password);
    employeeList.push({
      ...employee,
      id,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await knex(ETableNames.employee)
    .insert(employeeList)
    .then(() =>
      console.info(`# Inserted seed in '${ETableNames.employee}' table.`),
    );
}

const employeeToInsert = [
  {
    first_name: 'rowValue1',
    last_name: 'rowValue1',
    email: 'rowValue1@gmail.com',
    password: 'rowValue1',
  },
  {
    first_name: 'rowValue2',
    last_name: 'rowValue2',
    email: 'rowValue2@gmail.com',
    password: 'rowValue2',
  },
  {
    first_name: 'rowValue3',
    last_name: 'rowValue3',
    email: 'rowValue3@gmail.com',
    password: 'rowValue3',
  },
  {
    first_name: 'rowValue4',
    last_name: 'rowValue4',
    email: 'rowValue4@gmail.com',
    password: 'rowValue4',
  },
  {
    first_name: 'rowValue5',
    last_name: 'rowValue5',
    email: 'rowValue5@gmail.com',
    password: 'rowValue5',
  },
  {
    first_name: 'rowValue6',
    last_name: 'rowValue6',
    email: 'rowValue6@gmail.com',
    password: 'rowValue6',
  },
  {
    first_name: 'rowValue7',
    last_name: 'rowValue7',
    email: 'rowValue7@gmail.com',
    password: 'rowValue7',
  },
  {
    first_name: 'rowValue8',
    last_name: 'rowValue8',
    email: 'rowValue8@gmail.com',
    password: 'rowValue8',
  },
  {
    first_name: 'rowValue9',
    last_name: 'rowValue9',
    email: 'rowValue9@gmail.com',
    password: 'rowValue9',
  },
  {
    first_name: 'rowValue10',
    last_name: 'rowValue10',
    email: 'rowValue10@gmail.com',
    password: 'rowValue10',
  },
  {
    first_name: 'rowValue11',
    last_name: 'rowValue11',
    email: 'rowValue11@gmail.com',
    password: 'rowValue11',
  },
  {
    first_name: 'rowValue12',
    last_name: 'rowValue12',
    email: 'rowValue12@gmail.com',
    password: 'rowValue12',
  },
  {
    first_name: 'rowValue13',
    last_name: 'rowValue13',
    email: 'rowValue13@gmail.com',
    password: 'rowValue13',
  },
  {
    first_name: 'rowValue14',
    last_name: 'rowValue14',
    email: 'rowValue14@gmail.com',
    password: 'rowValue14',
  },
  {
    first_name: 'rowValue15',
    last_name: 'rowValue15',
    email: 'rowValue15@gmail.com',
    password: 'rowValue15',
  },
  {
    first_name: 'rowValue16',
    last_name: 'rowValue16',
    email: 'rowValue16@gmail.com',
    password: 'rowValue16',
  },
  {
    first_name: 'rowValue17',
    last_name: 'rowValue17',
    email: 'rowValue17@gmail.com',
    password: 'rowValue17',
  },
  {
    first_name: 'rowValue18',
    last_name: 'rowValue18',
    email: 'rowValue18@gmail.com',
    password: 'rowValue18',
  },
  {
    first_name: 'rowValue19',
    last_name: 'rowValue19',
    email: 'rowValue19@gmail.com',
    password: 'rowValue19',
  },
  {
    first_name: 'rowValue20',
    last_name: 'rowValue20',
    email: 'rowValue20@gmail.com',
    password: 'rowValue20',
  },
  {
    first_name: 'rowValue21',
    last_name: 'rowValue21',
    email: 'rowValue21@gmail.com',
    password: 'rowValue21',
  },
  {
    first_name: 'rowValue22',
    last_name: 'rowValue22',
    email: 'rowValue22@gmail.com',
    password: 'rowValue22',
  },
  {
    first_name: 'rowValue23',
    last_name: 'rowValue23',
    email: 'rowValue23@gmail.com',
    password: 'rowValue23',
  },
];
