import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee, signIn } from '../mocks';

describe('Get Employee by Id', () => {
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

  it('Search to a employee register', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .get(`/employee/${employeeMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Try to search a employee register with invalid id', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .get('/employee/123456')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
