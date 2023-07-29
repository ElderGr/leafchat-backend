import express from 'express';
import { createPost, deletePost, getPosts } from '@/controllers/post.controller';
import { createLikes, getLikes } from '@/controllers/like.controller';
import { createComment } from '@/controllers/comments.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', getPosts);
routes.post('/posts', upload.single('image'), createPost);
routes.delete('/posts/:id', deletePost);
//Likes
routes.post('/posts/:postId/like', createLikes);
//Coments
routes.post('/posts/:postId/comment', createComment);

export default routes;
