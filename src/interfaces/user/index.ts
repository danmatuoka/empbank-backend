export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type IUserLogin = Omit<IUser, 'id' | 'name'>;
