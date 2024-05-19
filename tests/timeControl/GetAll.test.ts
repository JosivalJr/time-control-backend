import { testServer } from '../jest.setup';

describe('Get All Time Control', () => {
  const timeControlMock = {
    id: '123',
    control_type: 'in',
    control_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('list all time control registers', async () => {
    const createResponseFirst = await testServer
      .post('/timecontrol')
      .send(timeControlMock);
    expect(createResponseFirst.statusCode).toBe(201);

    const createResponseSecond = await testServer
      .post('/timecontrol')
      .send(timeControlMock);
    expect(createResponseSecond.statusCode).toBe(201);

    const response = await testServer.get('/timecontrol').send();
    expect(response.statusCode).toBe(200);
    expect(Number(response.header['tc-total-count'])).toBeGreaterThan(1);
    expect(response.body.length).toBeGreaterThan(1);
  });
});
