import { Request, Response } from 'express';
import { IUserLogin } from '../interfaces/user';
import { createSessionService } from '../services/session.services';

export const createSessionController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const token = await createSessionService(data);

  return res.status(200).json({ token });
};
