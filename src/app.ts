import express from 'express';
import 'express-async-errors';
import handleErrorMiddleware from './middlewares/handleError.middleware';
import sessionRoutes from './routes/session.routes';
import transactionRoutes from './routes/transaction.routes';
import userRoutes from './routes/user.routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', sessionRoutes);
app.use('/transaction', transactionRoutes);

app.use(handleErrorMiddleware);

export default app;
