import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@prisma_config/generated/postgresql';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import { invalidCredentialsError } from './error';
import sessionRepository from '@/repositories/session-repository';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './.env.development') });

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserResult = Pick<User, 'id' | 'email' | 'password'>;

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUser(email);

  await matchPassword(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUser(email: string): Promise<GetUserResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function matchPassword(password: string, userPassword: string): Promise<void> {
  const isPasswordCorrect = await bcrypt.compare(password, userPassword);
  if (!isPasswordCorrect) throw invalidCredentialsError();
}

async function createSession(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || '');
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

const authenticate = {
  signIn,
};

export default authenticate;
