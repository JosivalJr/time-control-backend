import { testServer } from '../jest.setup';

describe('Create Time Control', () => {
  const timeControlMock = {
    id: '123',
    control_type: 'in',
    control_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };
  it('create new time control register', async () => {
    const response = await testServer
      .post('/timecontrol')
      .send(timeControlMock);
    expect(response.statusCode).toBe(201);
    // expect(response.body).toEqual(timeControlMock);
  });
  it("try create new time control register with invalid 'control_type'", async () => {
    const body = Object.assign(timeControlMock, { control_type: 'entry' });
    const response = await testServer.post('/timecontrol').send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.control_type');
  });
  it('try create new time control register with empty body', async () => {
    const response = await testServer.post('/timecontrol').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.control_type');
    expect(response.body).toHaveProperty('errors.body.control_time');
    expect(response.body).toHaveProperty('errors.body.created_at');
    expect(response.body).toHaveProperty('errors.body.updated_at');
  });
});
