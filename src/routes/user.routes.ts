import { Router } from 'express';
import {
  userCreateController,
  userListController,
} from '../controllers/user.controller';
import { ensureAuthUser } from '../middlewares/ensureAuthUser.middleware';

const userRoutes = Router();

userRoutes.post('', userCreateController);
userRoutes.get('', ensureAuthUser, userListController);

export default userRoutes;
