import express from 'express';
import { createComment, getComments } from '@/controllers/comments.controller';
import multer from 'multer';
import uploadConfig from '@/config/upload';
import { validateBody, validateParams } from '@/schemas/validation-middleware';
import { createCommentSchema, getCommentSchema } from '@/schemas/comment.schemas';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();
const upload = multer(uploadConfig);

routes
  .post(`/:postId/comments`, validateBody(createCommentSchema), authenticateToken, upload.array('image'), createComment)
  .get(`/:postId/comments`, validateParams(getCommentSchema), authenticateToken, getComments);

export default routes;
