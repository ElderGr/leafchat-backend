import express from 'express';
import { createComment, getComments } from '@/controllers/comments.controller';

const routes = express.Router();

routes.post(`/:postId/comments`, createComment);
routes.get(`/:postId/comments`, getComments);

export default routes;
