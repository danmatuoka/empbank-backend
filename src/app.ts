import express from 'express';
import 'express-async-errors';
import handleErrorMiddleware from './middlewares/handleError.middleware';
import sessionRoutes from './routes/session.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', sessionRoutes);

app.use(handleErrorMiddleware);

export default app;
