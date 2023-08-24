import userRepository from '@/repositories/user-repository';
import { nonExistentUserError } from '../user-service/errors';
import postRepository from '@/repositories/post-repository';
import { postNotFoundError } from '../post-service/error';
import { Comments } from '@prisma_config/generated/postgresql';
import commentRepository from '@/repositories/comment-repository';

type IAddComment = Pick<Comments, 'post_id' | 'user_id' | 'body'>;
type IListComments = Pick<Comments, 'post_id'>;

async function add({ body, post_id, user_id }: IAddComment): Promise<Comments> {
  const user = await userRepository.findById(user_id);
  if (!user) {
    throw nonExistentUserError();
  }

  const post = await postRepository.findById(post_id);

  if (!post) {
    throw postNotFoundError();
  }

  const createdComment = await commentRepository.create({
    body,
    post_id,
    user_id,
  });

  return createdComment;
}

async function list({ post_id }: IListComments): Promise<Comments[]> {
  const post = await postRepository.findById(post_id);
  if (!post) {
    throw postNotFoundError();
  }

  const comments = await commentRepository.list({
    post_id,
  });

  return comments;
}

const commentService = {
  add,
  list,
};

export default commentService;
