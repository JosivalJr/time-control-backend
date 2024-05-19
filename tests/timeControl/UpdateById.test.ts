import { testServer } from '../jest.setup';

const createAnTimeControl = async (mock: any) => {
  return await testServer.post('/timecontrol').send(mock);
};

describe('Update Time Control by Id', () => {
  const timeControlMock = {
    id: '123',
    control_type: 'in',
    control_time: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('update an time control register', async () => {
    await createAnTimeControl(timeControlMock);
    const updateBody = Object.assign(timeControlMock, { control_type: 'out' });
    const updateResponse = await testServer
      .patch(`/timecontrol/${timeControlMock.id}`)
      .send(updateBody);

    expect(updateResponse.statusCode).toBe(202);
    // expect(updateResponse.body).toEqual(updateBody);
  });

  it("try update an time control register with invalid 'control_type'", async () => {
    await createAnTimeControl(timeControlMock);
    const updateBody = Object.assign(timeControlMock, {
      control_type: 'entry',
    });
    const response = await testServer
      .patch(`/timecontrol/${timeControlMock.id}`)
      .send(updateBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.body.control_type');
  });

  it('try update an time control register with empty body', async () => {
    await createAnTimeControl(timeControlMock);
    const response = await testServer
      .patch(`/timecontrol/${timeControlMock.id}`)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('try to update an time control register with invalid id', async () => {
    await createAnTimeControl(timeControlMock);
    const updateBody = Object.assign(timeControlMock, { control_type: 'out' });
    const response = await testServer
      .patch('/timecontrol/9999')
      .send(updateBody);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors.default');
  });
});
