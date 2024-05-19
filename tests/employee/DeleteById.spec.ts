import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee } from '../mocks';

describe('Delete Employee', () => {
  let employeeMock: IEmployee | undefined = undefined;

  beforeAll(async () => {
    employeeMock = await createEmployee();
  });

  it('delete an employee register', async () => {
    expect(employeeMock).toHaveProperty('id');

    const deleteResponse = await testServer
      .delete(`/employee/${employeeMock?.id}`)
      .send();

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('try delete an employee register with invalid id', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer.delete('/employee/123').send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
