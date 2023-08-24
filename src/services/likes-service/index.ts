import userRepository from '@/repositories/user-repository';
import { nonExistentUserError } from '../user-service/errors';
import postRepository from '@/repositories/post-repository';
import { postNotFoundError } from '../post-service/error';
import likesRepository from '@/repositories/likes-repository';

async function addOrRemove(postId: string, userId: string): Promise<void> {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw nonExistentUserError();
  }

  const post = await postRepository.findById(postId);
  if (!post) {
    throw postNotFoundError();
  }

  const haveAnLike = await likesRepository.findByPost({
    post_id: post.id,
    user_id: user.id,
  });

  if (!haveAnLike) {
    await likesRepository.addLike({
      post_id: post.id,
      user_id: user.id,
    });
  } else {
    await likesRepository.removeLike({
      post_id: post.id,
      user_id: user.id,
    });
  }
}

const likeService = {
  addOrRemove,
};

export default likeService;
