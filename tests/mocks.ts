import { UUID } from 'crypto';
import { IEmployee, ITimeControl } from '../src/database/models';
import { testServer } from './jest.setup';

export const createEmployee = async (
  employee?: Partial<Omit<IEmployee, 'id' | 'created_at' | 'updated_at'>>,
): Promise<IEmployee> => {
  const employeePrototype = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    email: 'jg@gmail.com',
    password: '123456',
  };

  const body = employee
    ? { ...employeePrototype, ...employee }
    : employeePrototype;

  const employeeResponse = await testServer.post('/employee').send(body);
  return employeeResponse.body as IEmployee;
};

export const createTimeControl = async (
  timecontrol: Omit<ITimeControl, 'id' | 'created_at' | 'updated_at'>,
  employeeAccessToken: string,
): Promise<ITimeControl> => {
  const response = await testServer
    .post('/timecontrol')
    .send(timecontrol)
    .set({ authorization: `Bearer ${employeeAccessToken}` });
  return response.body as ITimeControl;
};

export const signIn = async (id: UUID, password: string): Promise<string> => {
  const accessTokenResponse = await testServer
    .post('/employee/signin')
    .send({ id, password });

  return accessTokenResponse.body.accessToken;
};
