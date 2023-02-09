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

export const listTransactionService = async (userId: string) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);
  const owner = await userRepository.findOneBy({ id: userId });

  if (!owner) throw new AppError('You do not have access', 403);

  const transactions = await transactionRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  return transactions;
};
