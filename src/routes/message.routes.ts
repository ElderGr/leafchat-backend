import express from 'express';
import { createMessage, findAllMessages } from '@/controllers/message.controller';
import multer from 'multer';
import { validateBody } from '@/schemas/validation-middleware';
import { createMessageSchema } from '@/schemas/message.schemas';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();
const upload = multer();

routes.post(`/message`, authenticateToken, validateBody(createMessageSchema), upload.single('audio'), createMessage);
routes.get(`/message`, authenticateToken, findAllMessages);

export default routes;
