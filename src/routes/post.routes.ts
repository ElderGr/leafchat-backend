import express from 'express';
import { createPost, deletePost, getPosts } from '@/controllers/post.controller';
import { addLikes } from '@/controllers/like.controller';
import { createComment } from '@/controllers/comments.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();
const upload = multer(uploadConfig);

routes
  .all('/*', authenticateToken)
  .get('/posts', getPosts)
  .post('/posts', upload.array('image'), createPost)
  .delete('/posts/:id', deletePost)
  .post('/posts/:postId/like', addLikes)
  .post('/posts/:postId/comment', createComment);

export default routes;
