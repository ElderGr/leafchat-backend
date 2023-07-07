import { IUserInParams } from 'interfaces/user-interface';
import Joi from 'joi';

export const userSchema = Joi.object<IUserInParams>({
  name: Joi.string().required(),
  avatar_url: Joi.string().required(),
  roles: Joi.string().required(),
});
