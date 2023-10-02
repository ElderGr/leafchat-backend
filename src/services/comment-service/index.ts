import userRepository from '@/repositories/user-repository';
import { nonExistentUserError } from '../user-service/errors';
import postRepository from '@/repositories/post-repository';
import { postNotFoundError } from '../post-service/error';
import { Comments } from '@prisma_config/generated/postgresql';
import commentRepository from '@/repositories/comment-repository';

type IAddComment = Pick<Comments, 'post_id' | 'user_id' | 'body'> & {
  files: {
    filename: string;
  }[];
}

type IListComments = Pick<Comments, 'post_id'>;

async function add({ body, post_id, user_id, files }: IAddComment): Promise<Comments> {
  const user = await userRepository.findById(user_id);
  if (!user) {
    throw nonExistentUserError();
  }

  const post = await postRepository.findById(post_id);

  if (!post) {
    throw postNotFoundError();
  }

  

  const formatFiles = files.map((file) => ({
    name: file.filename,
    link: `${process.env.BACKEND_URL}/files/${file.filename}`,
  }));


  const createdComment = await commentRepository.create({
    body,
    post_id,
    user_id,
    files: formatFiles
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
