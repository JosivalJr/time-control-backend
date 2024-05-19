import * as create from './Create';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as count from './Count';

export const TimeControlProvider = {
  ...create,
  ...getById,
  ...updateById,
  ...deleteById,
  ...getAll,
  ...count,
};
