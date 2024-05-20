import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { ITimeControl } from '../../models';

export const create = async (
  timecontrol: Omit<ITimeControl, 'created_at' | 'updated_at'>,
): Promise<ITimeControl | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.employee)
      .where('id', '=', timecontrol.employee_id)
      .count<[{ count: number }]>('* as count');

    if (count === 0)
      return Error(
        `Error to register an new time control on database. Employee '${timecontrol.employee_id}'cannot be found in database`,
      );

    const [result] = await Knex(ETableNames.timeControl)
      .insert({
        ...timecontrol,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return result;
  } catch (error) {
    console.error(error);
    return Error('Error to register an new time control on database.');
  }
};
