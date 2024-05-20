import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee, signIn } from '../mocks';

describe('Get All Employees', () => {
  let employeeMock: IEmployee | undefined = undefined;
  let employeeAccessToken: string;
  let employeePassword: string;

  beforeAll(async () => {
    const password = '123456';
    const employee = await createEmployee({ password });
    employeeMock = employee;
    employeeAccessToken = await signIn(employeeMock?.id, password);
    employeePassword = password;
  });

  it('List all employee registers', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .get('/employee')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();
    expect(response.statusCode).toBe(200);
    expect(Number(response.header['em-total-count'])).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
