import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';
import { IEmployee } from '../../models';

export const getAll = async (
  page?: number,
  limit?: number,
): Promise<IEmployee[] | Error> => {
  try {
    page = page || 1;
    limit = limit || 25;
    const result = await Knex(ETableNames.employee)
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.error(error);
    return Error('Error to list all control time on database.');
  }
};
