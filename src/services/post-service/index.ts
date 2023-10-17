import postRepository from '@/repositories/post-repository';
import { Post } from '../../../prisma/generated/postgresql';
import userRepository from '@/repositories/user-repository';
import { nonExistentUserError } from '../user-service/errors';
import { missingBackendEnvError } from '@/errors/env.error';
import { postNotFoundError } from './error';
import { CreatePostDto } from '@/domain/post/post.dto';

export type IListPostParams = Partial<Omit<Post, 'description' | 'updated_at'>> & {
  take?: number;
};

async function createPost({ description, title, user_id, files }: CreatePostDto): Promise<Post> {
  const user = await userRepository.findById(user_id);
  if (!user) {
    throw nonExistentUserError();
  }

  if (!process.env.BACKEND_URL) {
    throw missingBackendEnvError();
  }

  const createdPost = await postRepository.create({
    description,
    title,
    user_id,
    files,
  });

  return createdPost;
}

async function listPost({ create_at, id, title, user_id, take }: IListPostParams) {
  return await postRepository.list({
    create_at,
    id: id?.split(','),
    title,
    user_id: user_id?.split(','),
    take,
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
