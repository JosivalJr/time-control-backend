import { testServer } from '../jest.setup';

describe('Delete Time Control', () => {
  const timeControlMock = {
    id: '123',
    control_type: 'in',
    control_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };
  it('delete an time control register', async () => {
    const createResponse = await testServer
      .post('/timecontrol')
      .send(timeControlMock);

    expect(createResponse.statusCode).toBe(201);

    const deleteResponse = await testServer
      .delete(`/timecontrol/${createResponse.body.id}`)
      .send();

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('try delete an time control register with invalid id', async () => {
    const response = await testServer.delete('/timecontrol/9999').send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
