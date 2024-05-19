import { testServer } from '../jest.setup';

describe('Delete Employee', () => {
  const employeeMock = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    id: '123',
    email: 'jgoliveira@gmail.com',
    password: '123',
  };

  it('delete an employee register', async () => {
    const createResponse = await testServer
      .post('/employee')
      .send(employeeMock);

    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.body).toEqual(employeeMock);

    const deleteResponse = await testServer
      .delete(`/employee/${createResponse.body.id}`)
      .send();

    expect(deleteResponse.statusCode).toBe(204);
  });

  it('try delete an employee register with invalid id', async () => {
    const response = await testServer.delete('/employee/9999').send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
