import { ETableNames } from '../../ETables';
import { Knex } from '../../knex';

export const count = async (): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.employee).count<
      [{ count: number }]
    >('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return Error('Error to count employee on database.');
  } catch (error) {
    console.error(error);
    return Error('Error tocount employee on database.');
  }
};
