import { Router } from 'express';
import {
  createTransactionController,
  listAllTransactionController,
  listTransactionController,
} from '../controllers/transaction.controller';
import { ensureAuthUser } from '../middlewares/ensureAuthUser.middleware';

const transactionRoutes = Router();

transactionRoutes.post('', ensureAuthUser, createTransactionController);
transactionRoutes.get('', ensureAuthUser, listTransactionController);
transactionRoutes.get('/all', ensureAuthUser, listAllTransactionController);

export default transactionRoutes;
