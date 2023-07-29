import userRepository, { ICreateUserParams, IFindUserParams } from 'repositories/user-repository';
import bcrypt from 'bcrypt';
import { duplicatedEmailError, nonExistentUserError } from '@/services/user-service/errors';
import { User } from '@prisma_config/generated/postgresql';
import { exclude } from '@/utils/prisma-utils';

type IUpdateUser = ICreateUserParams & {
  id: string;
};

export async function createUser(userParams: ICreateUserParams): Promise<User> {
  await validateUniqueEmail(userParams.email);

  const hashedPassword = await bcrypt.hash(userParams.password, 12);

  return userRepository.create({ ...userParams, password: hashedPassword });
}

export async function updateUser(userParams: IUpdateUser): Promise<User> {
  const hashedPassword = await bcrypt.hash(userParams.password, 12);

  return userRepository.update(userParams.id, exclude({ ...userParams, password: hashedPassword }, 'id'));
}

export async function getUser(getUserParams: IFindUserParams): Promise<User[]> {
  return userRepository.findMany(getUserParams);
}

async function validateUniqueEmail(email: string) {
  const emailExist = await userRepository.findByEmail(email);
  if (emailExist) {
    throw duplicatedEmailError();
  }
}

export async function deleteUser(userId: string): Promise<void> {
  const userExist = await userRepository.findById(userId);
  if (!userExist) {
    throw nonExistentUserError();
  }

  await userRepository.remove(userId);
}
