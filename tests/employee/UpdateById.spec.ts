import { IEmployee } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee } from '../mocks';

describe('Update Employee by Id', () => {
  let employeeMock: IEmployee | undefined = undefined;

  beforeAll(async () => {
    employeeMock = await createEmployee();
  });

  it('update an employee register', async () => {
    expect(employeeMock).toHaveProperty('id');

    const first_name = 'José';
    const updateBody = { ...employeeMock, first_name };
    const updateResponse = await testServer
      .patch(`/employee/${employeeMock?.id}`)
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(202);
    expect(updateResponse.body).toHaveProperty('first_name', first_name);
  });

  it("try update an employee register with short 'first_name'", async () => {
    expect(employeeMock).toHaveProperty('id');

    const first_name = 'Jo';
    const updateBody = { ...employeeMock, first_name };
    const response = await testServer
      .patch(`/employee/${employeeMock?.id}`)
      .send(updateBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
  });

  it('try update an employee register with empty body', async () => {
    expect(employeeMock).toHaveProperty('id');

    const response = await testServer
      .patch(`/employee/${employeeMock?.id}`)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('try to update an employee register with invalid id', async () => {
    expect(employeeMock).toHaveProperty('id');

    const first_name = 'José';
    const updateBody = { ...employeeMock, first_name };

    const response = await testServer.patch('/employee/123').send(updateBody);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
