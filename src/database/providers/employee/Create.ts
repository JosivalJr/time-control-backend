import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const create = async (
  employee: IEmployee,
): Promise<IEmployee | Error> => {
  try {
    const [result] = await Knex(ETableNames.employee)
      .insert(employee)
      .returning('*');

    return result;
  } catch (error) {
    console.error(error);
    return Error('Error to register an new employee on database.');
  }
};
