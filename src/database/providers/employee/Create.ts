import { PasswordCrypto } from '../../../services';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const create = async (
  employee: Omit<IEmployee, 'created_at' | 'updated_at'>,
): Promise<Partial<IEmployee> | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.employee)
      .where('email', '=', employee.email)
      .count<[{ count: number }]>('* as count');

    if (count > 0)
      return Error(
        `Error to register an new employee on database. Email already registered.`,
      );

    const hashedPassword = await PasswordCrypto.hashPassword(employee.password);

    const [result] = await Knex(ETableNames.employee)
      .insert({
        ...employee,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    const employeeInfos: Partial<IEmployee> = { ...result };
    delete employeeInfos.password;
    return employeeInfos;
  } catch (error) {
    console.error(error);
    return Error('Error to register an new employee on database.');
  }
};
