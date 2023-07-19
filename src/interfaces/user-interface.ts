export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  roles: string;
  create_at: string;
  updated_at: string;
}

export type IUserInParams = Pick<IUser, 'name' | 'avatar_url' | 'roles' | 'email' | 'password'>;