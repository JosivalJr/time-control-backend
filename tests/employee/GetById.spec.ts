import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee } from '../mocks';

describe('Get Employee by Id', () => {
  let employeeMock: IEmployee | undefined = undefined;

  beforeAll(async () => {
    employeeMock = await createEmployee();
  });

  it('search an employee register', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .get(`/employee/${employeeMock?.id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('try to search an employee register with invalid id', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer.get('/employee/123').send();
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
