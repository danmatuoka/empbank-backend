import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';
import { IUserLogin } from '../interfaces/user';
import { AppError } from '../errors/appError';
import 'dotenv/config';

export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError('Invalid email or password', 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Invalid email or password', 403);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY as string, {
    expiresIn: '12h',
    subject: user.id,
  });

  return token;
};
