import { testServer } from '../jest.setup';

describe('Create Employee', () => {
  const employeeMock = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    id: '123',
    email: 'jgoliveira@gmail.com',
    password: '123',
  };

  it('create new employee register', async () => {
    const response = await testServer.post('/employee').send(employeeMock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(employeeMock);
  });

  it("try create new employee register with short 'first_name'", async () => {
    const body = Object.assign(employeeMock, { first_name: 'Jo' });
    const response = await testServer.post('/employee').send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
  });

  it('try create new employee register with empty body', async () => {
    const response = await testServer.post('/employee').send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
    expect(response.body).toHaveProperty('errors.body.last_name');
    expect(response.body).toHaveProperty('errors.body.email');
    expect(response.body).toHaveProperty('errors.body.id');
    expect(response.body).toHaveProperty('errors.body.password');
  });
});
