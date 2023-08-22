import express from 'express';
import { signInPost } from '@/controllers/authenticate.controller';

const routes = express.Router();

routes.post('/sign-in', signInPost);

export default routes;
