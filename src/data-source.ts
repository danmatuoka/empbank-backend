import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from './entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { createTables1676305262185 } from './migrations/1676305262185-createTables';
const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [User, Transaction],
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
        migrations: [createTables1676305262185],
      }
);

export default AppDataSource;
