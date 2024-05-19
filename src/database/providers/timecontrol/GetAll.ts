import { UUID } from 'crypto';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { ITimeControl } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: UUID | undefined,
): Promise<ITimeControl[] | Error> => {
  try {
    const result = filter
      ? await Knex(ETableNames.timeControl)
          .select('*')
          .where('employee_id', 'like', `%${filter}%`)
          .offset((page - 1) * limit)
          .limit(limit)
      : await Knex(ETableNames.timeControl)
          .select('*')
          .offset((page - 1) * limit)
          .limit(limit);

    return result;
  } catch (error) {
    console.error(error);
    return Error('Error to list all control time on database.');
  }
};
