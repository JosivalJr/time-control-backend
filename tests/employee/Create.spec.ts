import { testServer } from '../jest.setup';

describe('Create Employee', () => {
  const employeeMock = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    email: 'jgoliveira@gmail.com',
    password: '123456',
  };

  it('Create a new employee register', async () => {
    const response = await testServer.post('/employee').send(employeeMock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('first_name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it("Try create a new employee register with short 'first_name'", async () => {
    const first_name = 'Jo';
    const body = { ...employeeMock, first_name };
    const response = await testServer.post('/employee').send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
  });

  it('Try create a new employee register without sending the body in the request', async () => {
    const response = await testServer.post('/employee').send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
    expect(response.body).toHaveProperty('errors.body.last_name');
    expect(response.body).toHaveProperty('errors.body.email');
    expect(response.body).toHaveProperty('errors.body.password');
  });
});
