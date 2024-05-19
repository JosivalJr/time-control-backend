import { testServer } from '../jest.setup';

describe('Get All Employees', () => {
  const employeeMock = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    id: '123',
    email: 'jgoliveira@gmail.com',
    password: '123',
  };

  it('list all employee registers', async () => {
    const createResponseFirst = await testServer
      .post('/employee')
      .send(employeeMock);
    expect(createResponseFirst.statusCode).toBe(201);

    const createResponseSecond = await testServer
      .post('/employee')
      .send(employeeMock);
    expect(createResponseSecond.statusCode).toBe(201);

    const response = await testServer.get('/employee').send();
    expect(response.statusCode).toBe(200);
    expect(Number(response.header['em-total-count'])).toBeGreaterThan(1);
    expect(response.body.length).toBeGreaterThan(1);
  });
});
