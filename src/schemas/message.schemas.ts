import { CreateMessageDto } from '@/domain/message/message.dto';
import Joi from 'joi';

export const createMessageSchema = Joi.object<CreateMessageDto>({
  content: Joi.string().required(),
  chatId: Joi.string().required(),
  contentType: Joi.string().required(),
  owner: Joi.string().required(),
});
