import { Router } from 'express';
import {
  createTransactionController,
  listTransactionController,
} from '../controllers/transaction.controller';
import { ensureAuthUser } from '../middlewares/ensureAuthUser.middleware';

const transactionRoutes = Router();

transactionRoutes.post('', ensureAuthUser, createTransactionController);
transactionRoutes.get('', ensureAuthUser, listTransactionController);

export default transactionRoutes;
