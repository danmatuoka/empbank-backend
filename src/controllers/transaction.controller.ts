import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { ITransaction } from '../interfaces/transaction';
import {
  createTransactionService,
  listTransactionService,
} from '../services/transaction.service';

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  const newTransaction: ITransaction = req.body;
  const userId = req.user.id;

  const createTransaction = await createTransactionService(
    newTransaction,
    userId
  );

  return res.status(201).json(instanceToPlain(createTransaction));
};

export const listTransactionController = async (
  req: Request,
  res: Response
) => {
  const transactions = await listTransactionService(req.user.id);

  return res.status(200).json(transactions);
};
