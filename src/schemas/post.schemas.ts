import { CreatePostDto } from '@/domain/post/post.dto';
import Joi from 'joi';

export const createPostSchema = Joi.object<CreatePostDto>({
  description: Joi.string().required(),
  title: Joi.string().required(),
  user_id: Joi.string().required(),
});
