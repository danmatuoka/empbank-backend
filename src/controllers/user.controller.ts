import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user';
import { userCreateService, userListService } from '../services/user.services';

export const userCreateController = async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const createdUser = await userCreateService(user);

  return res.status(201).json(instanceToPlain(createdUser));
};

export const userListController = async (req: Request, res: Response) => {
  const users = await userListService(req.user.id);

  return res.json(instanceToPlain(users));
};
