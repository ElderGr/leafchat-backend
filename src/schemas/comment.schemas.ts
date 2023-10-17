import { CreateCommentDto, FindAllDto } from '@/domain/comment/comment.dto';
import Joi from 'joi';

export const createCommentSchema = Joi.object<CreateCommentDto>({
  content: Joi.string().required(),
});

export const getCommentSchema = Joi.object<FindAllDto>({
  postId: Joi.string(),
});
