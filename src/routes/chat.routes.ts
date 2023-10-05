import express from 'express';
import { createChat, getChat } from '@/controllers/chat.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/chat', getChat).post('/chat', authenticateToken, createChat);
// .delete('/chat/:chatid', deleteChat);

export default routes;
