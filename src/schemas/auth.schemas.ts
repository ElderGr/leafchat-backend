import { SignInDto } from '@/domain/auth/auth.dto';
import Joi from 'joi';

export const signInSchema = Joi.object<SignInDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
