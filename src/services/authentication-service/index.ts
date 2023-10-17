import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import { invalidCredentialsError } from './error';
import sessionRepository from '@/repositories/session-repository';
import { SignInDto, SignInResponse } from '@/domain/auth/auth.dto';
import { UserModel } from '@/domain/user/user.model';

async function signIn(params: SignInDto): Promise<SignInResponse> {
  const { email, password } = params;

  const user = await getUser(email);

  await matchPassword(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUser(email: string): Promise<UserModel> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
  });
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
