import { testServer } from '../jest.setup';

describe('Get Time Control by Id', () => {
  it('search an time control register', async () => {
    const id = '123';
    const response = await testServer.get(`/timecontrol/${id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(id);
  });
  it('try to search an time control register without send id', async () => {
    const response = await testServer.get('/timecontrol/9999').send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
