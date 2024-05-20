import { IEmployee, ITimeControl } from '../../src/database/models';
import { testServer } from '../jest.setup';

import { createEmployee, createTimeControl, signIn } from '../mocks';

describe('Update Time Control by Id', () => {
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

  it('Update a time control register', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const control_type = 'out';
    const updateBody = { ...timeControlMock, control_type };
    const updateResponse = await testServer
      .patch(`/timecontrol/${timeControlMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(202);
    expect(updateResponse.body).toHaveProperty('control_type', control_type);
  });

  it("Try to update a time control register with invalid 'control_type'", async () => {
    expect(timeControlMock).toHaveProperty('id');

    const control_type = 'entry';
    const updateBody = { ...timeControlMock, control_type };
    const updateResponse = await testServer
      .patch(`/timecontrol/${timeControlMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body).toHaveProperty('errors.body.control_type');
  });

  it('Try to update a time control register without sending the body in the request', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const response = await testServer
      .patch(`/timecontrol/${timeControlMock?.id}`)
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('Try to update a time control register with invalid id', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const control_type = 'out';
    const updateBody = { ...timeControlMock, control_type };

    const response = await testServer
      .patch('/timecontrol/123456')
      .set({ authorization: `Bearer ${employeeAccessToken}` })
      .send(updateBody);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
