import express from 'express';

import SessionRoutes from '@/routes/authenticate.routes';
import PostRoutes from '@/routes/post.routes';
import UserRoutes from '@/routes/user.routes';
import ChatRoutes from '@/routes/chat.routes';
import MessageRoutes from '@/routes/message.routes';
import CommentsRoutes from '@/routes/comment.routes';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();

routes
  .use('/auth', SessionRoutes)
  .use(UserRoutes)
  .use(PostRoutes)
  .use(ChatRoutes)
  .use(MessageRoutes)
  .use(authenticateToken, CommentsRoutes);

export default routes;
