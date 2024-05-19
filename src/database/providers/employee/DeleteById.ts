import { UUID } from 'crypto';
import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';

export const deleteById = async (id: UUID): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.employee).where('id', '=', id).del();

    if (result > 0) return;
  } catch (error) {
    console.error(error);
    return Error(`Error to delete employee id: '${id}' on database.`);
  }
};
