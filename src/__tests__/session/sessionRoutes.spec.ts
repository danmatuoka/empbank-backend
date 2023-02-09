import { DataSource } from 'typeorm';
import AppDataSource from '../../data-source';
import request from 'supertest';
import app from '../../app';
import { mockedUser, mockedUserLogin } from '../mocks';

describe('/login - session routes', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error('Error during Data Source initialization', err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to login', async () => {
    await request(app).post('/user').send(mockedUser);
    const response = await request(app).post('/login').send(mockedUserLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to login with an incorrect email', async () => {
    const response = await request(app).post('/login').send({
      email: 'wrong.email@mail.com',
      password: mockedUserLogin.password,
    });
    expect(response.status).toBe(403);
    expect(response.body.message).toEqual('Invalid email or password');
  });

  it('should not be able to login with an incorrect password', async () => {
    const response = await request(app).post('/login').send({
      email: mockedUserLogin.email,
      password: 'wrong pw',
    });
    expect(response.status).toBe(403);
    expect(response.body.message).toEqual('Invalid email or password');
  });
});
