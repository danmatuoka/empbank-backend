import AppDataSource from '../data-source';
import { hashSync } from 'bcrypt';
import { User } from '../entities/user.entity';
import { AppError } from '../errors/appError';
import { IUser } from '../interfaces/user';

export const userCreateService = async ({
  name,
  email,
  password,
}: IUser): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const userAlreadyExists = await userRepository.findOneBy({
    email,
  });

  if (userAlreadyExists) {
    throw new AppError('Email already exists', 400);
  }

  if (!password) {
    throw new AppError('Password is a required field', 400);
  }

  const hashedPassword = hashSync(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export const userListService = async (
  userId: string
): Promise<IUser | undefined> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users.find((user) => user.id === userId);
};
