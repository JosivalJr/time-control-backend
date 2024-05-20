import { IEmployee, ITimeControl } from '../../src/database/models';
import { createEmployee, createTimeControl, signIn } from '../mocks';
import { testServer } from '../jest.setup';

describe('Get All Time Control', () => {
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

  it('List all time control registers', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const response = await testServer
      .get('/timecontrol')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();
    expect(response.statusCode).toBe(200);
    expect(Number(response.header['em-total-count'])).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
