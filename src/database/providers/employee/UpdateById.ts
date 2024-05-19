import { UUID } from 'crypto';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const updateById = async (
  id: UUID,
  employee: Partial<IEmployee>,
): Promise<IEmployee | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.employee)
      .where('id', '=', id)
      .count<[{ count: number }]>('* as count');

    if (count === 0)
      return Error(
        `Error to register an new time control on database. Employee id '${id}'cannot be found in database`,
      );

    const updateBody = { ...employee, updated_at: new Date() };
    delete updateBody.id;

    const [result] = await Knex(ETableNames.employee)
      .update(updateBody)
      .where('id', '=', id)
      .returning('*');

    if (result) return result;
    return Error(`Error to update employee id:'${id}' on database.`);
  } catch (error) {
    console.error(error);
    return Error(`Error to update employee id:'${id}' on database.`);
  }
};
