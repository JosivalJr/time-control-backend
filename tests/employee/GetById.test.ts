import { testServer } from '../jest.setup';

describe('Get Employee by Id', () => {
  it('search an employee register', async () => {
    const id = '123';
    const response = await testServer.get(`/employee/${id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(id);
  });

  it('try to search an employee register with invalid id', async () => {
    const response = await testServer.get('/employee/9999').send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
