import * as create from './Create';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as getAll from './GetAll';

export const TimeControlController = {
  ...create,
  ...getById,
  ...updateById,
  ...deleteById,
  ...getAll,
};
