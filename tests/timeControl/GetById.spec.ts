import { IEmployee, ITimeControl } from '../../src/database/models';
import { testServer } from '../jest.setup';
import { createEmployee, createTimeControl } from '../mocks';

describe('Get Time Control by Id', () => {
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

  it('search an time control register', async () => {
    expect(timeControlMock).toHaveProperty('id');

    const response = await testServer
      .get(`/timecontrol/${timeControlMock?.id}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('try to search an time control register without send id', async () => {
    const response = await testServer.get('/timecontrol/123').send();
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
