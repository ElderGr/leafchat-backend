import { UserModel } from '../user/user.model';

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: Pick<UserModel, 'id' | 'email'>;
  token: string;
}
