import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee } from '../mocks';

describe('Sign In authentication', () => {
  let employeeMock: IEmployee | undefined = undefined;

  const employeeMockInfos = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    email: 'jg@gmail.com',
    password: '123456',
  };
  beforeAll(async () => {
    const employee = await createEmployee();
    employeeMock = employee;
  });

  it('Sign in with a registered employee', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .post('/employee/signin')
      .send({ id: employeeMock?.id, password: employeeMockInfos.password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('Try to sign in using the wrong password', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .post('/employee/signin')
      .send({ id: employeeMock?.id, password: 'teste321.teste123' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('Try to sign in with an unregistered employee', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .post('/employee/signin')
      .send({ id: crypto.randomUUID(), password: employeeMockInfos.password });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('errors.default');
  });
});
