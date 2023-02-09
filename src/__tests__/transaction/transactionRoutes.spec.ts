import { DataSource } from 'typeorm';
import AppDataSource from '../../data-source';
import request from 'supertest';
import app from '../../app';
import {
  mockedTransaction,
  mockedTransaction2,
  mockedUser,
  mockedUser2,
  mockedUserLogin,
  mockedUserLogin2,
} from '../mocks';

describe('/transaction - transaction routes', () => {
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

  it('should be able to create new transaction', async () => {
    await request(app).post('/user').send(mockedUser);
    const userLoginRes = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .post('/transaction')
      .send(mockedTransaction)
      .set('Authorization', `Bearer ${userLoginRes.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('category');
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('created_at');
  });

  it('should not be able to create new transaction without auth', async () => {
    const response = await request(app)
      .post('/transaction')
      .send(mockedTransaction);

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Invalid token');
  });

  it('should not be able to create new transaction with wrong token', async () => {
    const response = await request(app)
      .post('/transaction')
      .send(mockedTransaction)
      .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`);

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Invalid token');
  });

  it('should be able to get transaction infos', async () => {
    const userLoginRes = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .get('/transaction')
      .set('Authorization', `Bearer ${userLoginRes.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('category');
    expect(response.body[0]).toHaveProperty('type');
    expect(response.body[0]).toHaveProperty('value');
  });
});
