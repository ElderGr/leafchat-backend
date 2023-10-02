import express from 'express';
import { createComment, getComments } from '@/controllers/comments.controller';
import multer from 'multer';
import uploadConfig from '@/config/upload';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post(`/:postId/comments`, upload.array('image'), createComment);
routes.get(`/:postId/comments`, getComments);

export default routes;
