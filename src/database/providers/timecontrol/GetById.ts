import { UUID } from 'crypto';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { ITimeControl } from '../../models';

export const getById = async (id: UUID): Promise<ITimeControl[] | Error> => {
  try {
    const result = await Knex(ETableNames.timeControl)
      .select('*')
      .where('id', '=', id)
      .first();

    if (!result) return [];
    return [result];
  } catch (error) {
    console.error(error);
    return Error(`Error to search for time control id:'${id}' on database.`);
  }
};
