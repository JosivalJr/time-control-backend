import { IEmployee, ITimeControl } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    employee: IEmployee;
    timecontrol: ITimeControl;
  }
}
