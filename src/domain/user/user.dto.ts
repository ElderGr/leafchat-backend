import { UserModel } from './user.model';

export type IUserInParams = Pick<UserModel, 'name' | 'avatar_url' | 'roles' | 'email' | 'password'>;
