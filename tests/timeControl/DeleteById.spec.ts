import { ITimeControl } from '../../src/database/models';
import { createEmployee, createTimeControl } from '../mocks';
import { testServer } from '../jest.setup';

describe('Delete Time Control', () => {
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

  it('delete an time control register', async () => {
    expect(timeControlMock).toHaveProperty('employee_id');

    const deleteResponse = await testServer
      .delete(`/timecontrol/${timeControlMock?.id}`)
      .send();

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('try delete an time control register with invalid id', async () => {
    const response = await testServer.delete('/timecontrol/123').send();

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.params.id');
  });
});
