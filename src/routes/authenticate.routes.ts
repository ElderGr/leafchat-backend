import express from 'express';
import { signInPost } from '@/controllers/authenticate.controller';
import { validateBody } from '@/schemas/validation-middleware';
import { signInSchema } from '@/schemas/auth.schemas';

const routes = express.Router();

routes.post('/sign-in', validateBody(signInSchema), signInPost);

export default routes;
