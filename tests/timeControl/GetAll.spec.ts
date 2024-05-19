import { ITimeControl } from '../../src/database/models';
import { createEmployee, createTimeControl } from '../mocks';
import { testServer } from '../jest.setup';

describe('Get All Time Control', () => {
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

  it('list all time control registers', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const response = await testServer.get('/timecontrol').send();
    expect(response.statusCode).toBe(200);
    expect(Number(response.header['em-total-count'])).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
