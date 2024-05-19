import { IEmployee, ITimeControl } from '../src/database/models';
import { testServer } from './jest.setup';

export const createEmployee = async (): Promise<IEmployee> => {
  const response = await testServer.post('/employee').send({
    first_name: 'Josival',
    last_name: 'Oliveira',
    email: 'jg@gmail.com',
    password: '123',
  });
  return response.body as IEmployee;
};

export const createTimeControl = async (
  timecontrol: Omit<ITimeControl, 'id' | 'created_at' | 'updated_at'>,
): Promise<ITimeControl> => {
  const response = await testServer.post('/timecontrol').send(timecontrol);
  return response.body as ITimeControl;
};
