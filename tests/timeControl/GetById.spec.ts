import { IEmployee, ITimeControl } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee, createTimeControl, signIn } from '../mocks';

describe('Get Time Control by Id', () => {
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

  it('Search a time control register', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const response = await testServer
      .get(`/timecontrol/${timeControlMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Try to search a time control register without send id', async () => {
    const response = await testServer
      .get('/timecontrol/123456')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send();
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
