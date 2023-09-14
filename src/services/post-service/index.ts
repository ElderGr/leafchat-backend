import postRepository from '@/repositories/post-repository';
import { Post } from '../../../prisma/generated/postgresql';
import userRepository from '@/repositories/user-repository';
import { nonExistentUserError } from '../user-service/errors';
import { missingBackendEnvError } from '@/errors/env.error';
import { postNotFoundError } from './error';

export type ICreatePostParams = Pick<Post, 'title' | 'description' | 'user_id'> & {
  files: {
    filename: string;
  }[];
};

export type IListPostParams = Partial<Omit<Post, 'description' | 'updated_at'>>;

async function createPost({ description, title, user_id, files }: ICreatePostParams): Promise<Post> {
  const user = await userRepository.findById(user_id);
  if (!user) {
    throw nonExistentUserError();
  }

  if (!process.env.BACKEND_URL) {
    throw missingBackendEnvError();
  }

  const formatFiles = files.map((file) => ({
    name: file.filename,
    link: `${process.env.BACKEND_URL}/files/${file.filename}`,
  }));

  const createdPost = await postRepository.create({
    description,
    title,
    user_id,
    files: formatFiles,
  });

  return createdPost;
}

async function listPost({ create_at, id, title, user_id }: IListPostParams) {
  return await postRepository.list({
    create_at,
    id: id?.split(','),
    title,
    user_id: user_id?.split(','),
  });
}

async function removePost(id: string) {
  const post = await postRepository.findById(id);

  if (!post) {
    throw postNotFoundError();
  }

  await postRepository.remove(id);
}

const postService = {
  createPost,
  listPost,
  removePost,
};

export default postService;
