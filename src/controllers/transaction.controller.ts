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
  const userId = req.user.id;
  const baseUrl = req.baseUrl;
  let { limit, offset, page } = req.query;

  if (!page) {
    page = '1';
  }

  if (!limit) {
    limit = '5';
  }

  if (!offset) {
    offset = '0';
  }

  const transactions = await listTransactionService(
    userId,
    baseUrl,
    limit,
    offset,
    page
  );

  return res.status(200).json(transactions);
};
