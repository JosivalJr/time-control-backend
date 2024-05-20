import { testServer } from '../jest.setup';
import { IEmployee, ITimeControl } from '../../src/database/models';
import { createEmployee, signIn } from '../mocks';

describe('Create Time Control', () => {
  let timeControlMock:
    | Omit<ITimeControl, 'id' | 'created_at' | 'updated_at'>
    | undefined = undefined;
  let employeeMock: IEmployee | undefined = undefined;
  let employeeAccessToken: string;
  let employeePassword: string;

  beforeAll(async () => {
    const password = '123456';
    const employee = await createEmployee({ password });
    employeeMock = employee;
    employeeAccessToken = await signIn(employeeMock?.id, password);
    employeePassword = password;

    timeControlMock = {
      employee_id: employee.id,
      control_type: 'in',
      control_time: new Date(),
    };
  });

  it('Create a new time control register', async () => {
    expect(timeControlMock).toHaveProperty('employee_id');

    const response = await testServer
      .post('/timecontrol')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send(timeControlMock);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('employee_id');
    expect(response.body).toHaveProperty('control_type');
    expect(response.body).toHaveProperty('control_time');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
    expect(response.body.control_type).toBe('in');
  });

  it("Try to create a new time control register with invalid 'control_type'", async () => {
    const control_type = 'entry';
    const mockBody = { ...timeControlMock, control_type };
    const response = await testServer
      .post('/timecontrol')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send(mockBody);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.control_type');
  });

  it('Try to create a new time control register with empty body', async () => {
    const response = await testServer
      .post('/timecontrol')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.control_type');
    expect(response.body).toHaveProperty('errors.body.control_time');
  });
});
