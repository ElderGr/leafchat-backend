import { postgreClient } from '@/config';

type ILikeParams = {
  post_id: string;
  user_id: string;
};

async function findByPost({ post_id, user_id }: ILikeParams) {
  return postgreClient.likes.findFirst({
    where: {
      post_id,
      user_id,
    },
  });
}

async function addLike({ post_id, user_id }: ILikeParams) {
  return postgreClient.likes.create({
    data: {
      post_id,
      user_id,
    },
  });
}

async function removeLike({ post_id, user_id }: ILikeParams) {
  return postgreClient.likes.deleteMany({
    where: {
      user_id,
      post_id,
    },
  });
}

const likesRepository = {
  addLike,
  removeLike,
  findByPost,
};

export default likesRepository;
