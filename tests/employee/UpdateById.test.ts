import { testServer } from '../jest.setup';

const createAnEmployee = async (mock: any) => {
  return await testServer.post('/employee').send(mock);
};

describe('Update Employee by Id', () => {
  const employeeMock = {
    first_name: 'Josival',
    last_name: 'Oliveira',
    id: '123',
    email: 'jgoliveira@gmail.com',
    password: '123',
  };

  it('update an employee register', async () => {
    await createAnEmployee(employeeMock);
    const updateBody = Object.assign(employeeMock, { first_name: 'José' });
    const updateResponse = await testServer
      .patch(`/employee/${employeeMock.id}`)
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(202);
    expect(updateResponse.body).toEqual(updateBody);
  });

  it("try update an employee register with short 'first_name'", async () => {
    await createAnEmployee(employeeMock);
    const updateBody = Object.assign(employeeMock, { first_name: 'Jo' });
    const response = await testServer
      .patch(`/employee/${employeeMock.id}`)
      .send(updateBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.first_name');
  });

  it('try update an employee register with empty body', async () => {
    await createAnEmployee(employeeMock);
    const response = await testServer
      .patch(`/employee/${employeeMock.id}`)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('try to update an employee register with invalid id', async () => {
    await createAnEmployee(employeeMock);
    const updateBody = Object.assign(employeeMock, { first_name: 'José' });
    const response = await testServer.patch('/employee/9999').send(updateBody);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
