import * as create from './Create';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as signIn from './SignIn';

export const EmployeeController = {
  ...create,
  ...getById,
  ...updateById,
  ...deleteById,
  ...getAll,
  ...signIn,
};
