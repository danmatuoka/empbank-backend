import { DataSource } from 'typeorm';
import AppDataSource from '../../data-source';
import request from 'supertest';
import app from '../../app';
import { mockedUser, mockedUserLogin } from '../mocks';

describe('/user - user routes', () => {
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

  it('should be able to create new user', async () => {
    const response = await request(app).post('/user').send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should not be able to create a user whose email already exists', async () => {
    const response = await request(app).post('/user').send(mockedUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Email already exists');
  });

  it('should be able to get user info with correct token', async () => {
    const userLoginRes = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${userLoginRes.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should not be able get user info without token', async () => {
    await request(app).post('/login').send(mockedUserLogin);
    const response = await request(app).get('/user');

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Invalid token');
  });

  it('should not be able get user info with wrong token', async () => {
    await request(app).post('/login').send(mockedUserLogin);
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`);

    console.log(response.body);

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Invalid token');
  });
});
