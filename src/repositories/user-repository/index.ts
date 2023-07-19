import { postgreClient } from '@/config';
import { Prisma, User } from '@prisma_config/generated/postgresql';

async function create(createUser: ICreateUserParams) {
  return postgreClient.user.create({
    data: {
      ...createUser,
    },
  });
}

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return postgreClient.user.findUnique(params);
}

const userRepository = {
  create,
  findByEmail,
};

export type ICreateUserParams = Pick<User, 'avatar_url' | 'email' | 'name' | 'password' | 'roles'>;

export default userRepository;
