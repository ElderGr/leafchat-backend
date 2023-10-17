import express from 'express';
import { createPost, deletePost, getPosts } from '@/controllers/post.controller';
import { addLikes } from '@/controllers/like.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';
import { authenticateToken } from '@/middlewares/authentication.middleware';
import { validateBody } from '@/schemas/validation-middleware';
import { createPostSchema } from '@/schemas/post.schemas';

const routes = express.Router();
const upload = multer(uploadConfig);

routes
  .get('/posts', authenticateToken, getPosts)
  .post('/posts', authenticateToken, validateBody(createPostSchema), upload.array('image'), createPost)
  .delete('/posts/:id', authenticateToken, deletePost)
  .post('/posts/:postId/like', authenticateToken, addLikes);

export default routes;
