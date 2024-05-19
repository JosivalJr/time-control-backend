import { UUID } from 'crypto';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { ITimeControl } from '../../models';

export const updateById = async (
  id: UUID,
  timecontrol: Partial<Omit<ITimeControl, 'employee_id' | 'created_at'>>,
): Promise<ITimeControl | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.timeControl)
      .where('id', '=', id)
      .count<[{ count: number }]>('* as count');

    if (count === 0)
      return Error(
        `Error to register an new time control on database. Time control id '${id}'cannot be found in database`,
      );

    const updateBody = { ...timecontrol, updated_at: new Date() };
    delete updateBody.id;

    const [result] = await Knex(ETableNames.timeControl)
      .update(updateBody)
      .where('id', '=', id)
      .returning('*');

    if (result) return result;
    return Error(`Error to update time control id:'${id}' on database.`);
  } catch (error) {
    console.error(error);
    return Error(`Error to update time control id:'${id}' on database.`);
  }
};
