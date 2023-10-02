import { postgreClient } from '@/config';
import { Comments } from '../../../prisma/generated/postgresql';

type IAddComment = Pick<Comments, 'post_id' | 'user_id' | 'body'> & {
  files: {
    name: string;
    link: string;
  }[];
}
type IListComment = Pick<Comments, 'post_id'>;

async function create({ post_id, user_id, body, files }: IAddComment) {
  return postgreClient.comments.create({
    data: {
      post_id,
      user_id,
      body,
      Comments_files: {
        createMany: {
          data: files,
        }
      }
  
    },
  });
}

async function list({ post_id }: IListComment) {
  return postgreClient.comments.findMany({
    where: {
      post_id,
    },
    include: {
      User: true,
      Comments_files: true
    }
  });
}

const commentRepository = {
  create,
  list,
};

export default commentRepository;
