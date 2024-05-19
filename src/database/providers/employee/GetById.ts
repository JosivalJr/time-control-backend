import { UUID } from 'crypto';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const getById = async (id: UUID): Promise<IEmployee[] | Error> => {
  try {
    const result = await Knex(ETableNames.employee)
      .select('*')
      .where('id', '=', id)
      .first();

    if (!result) return [];
    return [result];
  } catch (error) {
    console.error(error);
    return Error(`Error to search for employee id:'${id}' on database.`);
  }
};
