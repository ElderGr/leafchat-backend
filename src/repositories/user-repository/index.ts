import { postgreClient } from '@/config';
import { Prisma, User } from '@prisma_config/generated/postgresql';

async function create(createUser: ICreateUserParams) {
  return postgreClient.user.create({
    data: createUser,
  });
}

async function update(userId: string, updatedUser: IUpdateUserParams) {
  return postgreClient.user.update({
    where: {
      id: userId,
    },
    data: updatedUser,
  });
}

async function findById(id: string) {
  const params: Prisma.UserFindFirstArgs = {
    where: {
      id,
      deleted_at: {
        equals: null,
      },
    },
  };

  return postgreClient.user.findFirst(params);
}

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindFirstArgs = {
    where: {
      email,
      deleted_at: {
        equals: null,
      },
    },
  };

  if (select) {
    params.select = select;
  }

  return postgreClient.user.findFirst(params);
}

async function findMany(findUserParams?: IFindUserParams) {
  const params: Prisma.UserFindManyArgs = {
    where: {
      ...findUserParams,
      name: {
        contains: findUserParams?.name,
        mode: 'insensitive',
      },
      roles: {
        in: findUserParams?.roles?.split(','),
        mode: 'insensitive',
      },
      deleted_at: {
        equals: null,
      },
    },
  };
  return postgreClient.user.findMany(params);
}

async function remove(id: string) {
  return postgreClient.user.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
}

export type IFindUserParams = Partial<Omit<User, 'password'>>;

export type IUpdateUserParams = Partial<User>;

const userRepository = {
  create,
  update,
  findByEmail,
  findMany,
  findById,
  remove,
};

export type ICreateUserParams = Pick<User, 'avatar_url' | 'email' | 'name' | 'password' | 'roles'>;

export default userRepository;
