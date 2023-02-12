import { off } from 'process';
import AppDataSource from '../data-source';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';
import { AppError } from '../errors/appError';
import { ITransaction } from '../interfaces/transaction';

export const createTransactionService = async (
  newTransactionData: ITransaction,
  userId: string
) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);

  const newTransaction = transactionRepository.create(newTransactionData);

  const user = await userRepository.findOneBy({ id: userId });

  newTransaction.user = user!;

  await transactionRepository.save(newTransaction);

  return newTransaction;
};

export const listTransactionService = async (
  userId: string,
  baseUrl: string,
  limit: any,
  offset: any,
  page: any
) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);
  const owner = await userRepository.findOneBy({ id: userId });

  if (!owner) throw new AppError('You do not have access', 403);

  const [transactions, count] = await transactionRepository.findAndCount({
    where: {
      user: {
        id: userId,
      },
    },
    order: {
      created_at: 'DESC',
    },
    skip: Number(page) == 1 ? 0 : Number(page) * Number(limit) - 5,
    take: Number(limit),
  });

  // const next = +offset + +limit;
  // const nextUrl =
  //   next < count ? `${baseUrl}?limit=${limit}&offset=${next}` : null;

  // const previous = +offset - +limit < 0 ? null : +offset - +limit;
  // const previousUrl =
  //   previous != null ? `${baseUrl}?limit=${limit}&offset=${previous}` : null;

  return { count, page, transactions };
};
