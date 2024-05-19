import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee } from '../mocks';

describe('Get All Employees', () => {
  let employeeMock: IEmployee | undefined = undefined;

  beforeAll(async () => {
    employeeMock = await createEmployee();
  });

  it('list all employee registers', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer.get('/employee').send();
    expect(response.statusCode).toBe(200);
    expect(Number(response.header['em-total-count'])).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
