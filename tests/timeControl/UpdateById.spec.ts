import { ITimeControl } from '../../src/database/models';
import { testServer } from '../jest.setup';

import { createEmployee, createTimeControl } from '../mocks';

describe('Update Time Control by Id', () => {
  let timeControlMock: ITimeControl | undefined = undefined;

  beforeAll(async () => {
    const employee = await createEmployee();
    const timecontrol = await createTimeControl({
      employee_id: employee.id,
      control_type: 'in',
      control_time: new Date(),
    });
    timeControlMock = timecontrol;
  });

  it('update an time control register', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const control_type = 'out';
    const updateBody = { ...timeControlMock, control_type };
    const updateResponse = await testServer
      .patch(`/timecontrol/${timeControlMock?.id}`)
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(202);
    expect(updateResponse.body).toHaveProperty('control_type', control_type);
  });

  it("try update an time control register with invalid 'control_type'", async () => {
    expect(timeControlMock).toHaveProperty('id');

    const control_type = 'entry';
    const updateBody = { ...timeControlMock, control_type };
    const updateResponse = await testServer
      .patch(`/timecontrol/${timeControlMock?.id}`)
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(400);
    expect(updateResponse.body).toHaveProperty('errors.body.control_type');
  });

  it('try update an time control register with empty body', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const response = await testServer
      .patch(`/timecontrol/${timeControlMock?.id}`)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('try to update an time control register with invalid id', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const control_type = 'out';
    const updateBody = { ...timeControlMock, control_type };

    const response = await testServer
      .patch('/timecontrol/123')
      .send(updateBody);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
