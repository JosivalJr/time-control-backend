import { IEmployee, ITimeControl } from '../../src/database/models';
import { createEmployee, createTimeControl, signIn } from '../mocks';
import { testServer } from '../jest.setup';

describe('Delete Time Control', () => {
  let timeControlMock: ITimeControl | undefined = undefined;
  let employeeMock: IEmployee | undefined = undefined;
  let employeeAccessToken: string;
  let employeePassword: string;

  beforeAll(async () => {
    const password = '123456';
    const employee = await createEmployee({ password });
    employeeMock = employee;
    employeeAccessToken = await signIn(employeeMock?.id, password);
    employeePassword = password;

    const timecontrol = await createTimeControl(
      {
        employee_id: employee.id,
        control_type: 'in',
        control_time: new Date(),
      },
      employeeAccessToken,
    );
    timeControlMock = timecontrol;
  });

  it('Delete a time control register', async () => {
    expect(timeControlMock).toHaveProperty('employee_id');

    const deleteResponse = await testServer
      .delete(`/timecontrol/${timeControlMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('Try to delete a time control register with invalid id', async () => {
    const response = await testServer
      .delete('/timecontrol/123456')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
