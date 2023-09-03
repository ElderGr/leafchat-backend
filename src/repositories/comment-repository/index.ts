import { postgreClient } from '@/config';
import { Comments } from '../../../prisma/generated/postgresql';

type IAddComment = Pick<Comments, 'post_id' | 'user_id' | 'body'>;
type IListComment = Pick<Comments, 'post_id'>;

async function create({ post_id, user_id, body }: IAddComment) {
  return postgreClient.comments.create({
    data: {
      post_id,
      user_id,
      body,
    },
  });
}

async function list({ post_id }: IListComment) {
  return postgreClient.comments.findMany({
    where: {
      post_id,
    },
  });
}

const commentRepository = {
  create,
  list,
};

export default commentRepository;
