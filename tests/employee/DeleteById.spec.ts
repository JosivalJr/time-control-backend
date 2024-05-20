import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee, signIn } from '../mocks';

describe('Delete Employee', () => {
  let employeeMock: IEmployee | undefined = undefined;
  let employeePassword: string;
  let employeeAccessToken: string;

  beforeAll(async () => {
    const password = '123456';
    const employee = await createEmployee({ password });
    employeeMock = employee;
    employeeAccessToken = await signIn(employeeMock?.id, password);
    employeePassword = password;
  });

  it('Delete a employee register', async () => {
    expect(employeeMock).toHaveProperty('id');

    const deleteResponse = await testServer
      .delete(`/employee/${employeeMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('Try to delete a employee register with invalid id', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .delete('/employee/123456')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
