import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee, signIn } from '../mocks';

describe('Update Employee by Id', () => {
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

  it("Update a employee's register", async () => {
    expect(employeeMock).toHaveProperty('id');

    const first_name = 'José';
    const updateResponse = await testServer
      .patch(`/employee/${employeeMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send({ id: employeeMock?.id, first_name });

    expect(updateResponse.statusCode).toBe(202);
    expect(updateResponse.body).toHaveProperty('first_name');
  });

  it("Try to update an employee register with with short 'first_name'", async () => {
    expect(employeeMock).toHaveProperty('id');

    const first_name = 'Jo';
    const response = await testServer
      .patch(`/employee/${employeeMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send({ id: employeeMock?.id, first_name });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
  });

  it('Try to update a employee register without sending the body in the request', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .patch(`/employee/${employeeMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('Try to update a employee register with an invalid identifier', async () => {
    expect(employeeMock).toHaveProperty('id');

    const first_name = 'José';
    const response = await testServer
      .patch('/employee/123456')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send({ id: employeeMock?.id, first_name });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
