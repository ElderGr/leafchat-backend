import userRepository, { ICreateUserParams } from 'repositories/user-repository';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from '@/services/user-service/errors';
import { User } from '@prisma_config/generated/postgresql';

export async function createUser(userParams: ICreateUserParams): Promise<User> {
  await validateUniqueEmail(userParams.email);

  const hashedPassword = await bcrypt.hash(userParams.password, 12);

  return userRepository.create({
    ...userParams,
    password: hashedPassword,
  });
}

async function validateUniqueEmail(email: string) {
  const emailExist = await userRepository.findByEmail(email);
  if (emailExist) {
    throw duplicatedEmailError();
  }
}
