import { postgreClient } from '@/config';
import { Post } from '../../../prisma/generated/postgresql';
import { Prisma } from '@prisma_config/generated/postgresql';

export type ICreatePostParams = Pick<Post, 'title' | 'description' | 'user_id'> & {
  files: {
    name: string;
    link: string;
  }[];
};

export type IListPostRepositoryParams = {
  user_id: string[];
  create_at: Date;
  id: string[];
  likes: number;
  title: string;
};

async function findById(id: string) {
  return postgreClient.post.findUnique({
    where: {
      id,
    },
  });
}

async function create({ description, files, title, user_id }: ICreatePostParams) {
  return postgreClient.post.create({
    data: {
      likes: 0,
      description,
      title,
      user_id,
      Post_files: {
        createMany: {
          data: files,
        },
      },
    },
  });
}

async function list({ user_id, create_at, id, likes, title }: Partial<IListPostRepositoryParams>) {
  const params: Prisma.PostFindManyArgs = {
    select: {
      id: true,
      description: true,
      title: true,
      user_id: true,
      create_at: true,
      updated_at: true,
      Post_files: true,
      Likes: true,
    },
  };

  if (user_id && user_id?.length > 0) {
    params.where = {
      user_id: {
        in: user_id,
      },
    };
  }

  if (id && id?.length > 0) {
    params.where = {
      id: {
        in: id,
      },
    };
  }

  if (title) {
    params.where = {
      title: {
        contains: `%${title}%`,
        mode: 'insensitive',
      },
    };
  }

  return postgreClient.post.findMany(params);
}

async function remove(id: string) {
  return postgreClient.post.delete({
    where: {
      id,
    },
  });
}

const postRepository = {
  create,
  list,
  remove,
  findById,
};

export default postRepository;
