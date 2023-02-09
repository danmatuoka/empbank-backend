import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { createTables1675962613130 } from './migrations/1675962613130-createTables';

const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: ['src/entities/*.ts'],
      }
    : {
        type: 'postgres',
        host: process.env.HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: [User, Transaction],
        migrations: [createTables1675962613130],
      }
);

export default AppDataSource;
