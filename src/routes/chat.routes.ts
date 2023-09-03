import express from 'express';
import { createChat, deleteChat, getChat, teste, createChatAudioMessage } from '@/controllers/chat.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';

const routes = express.Router();
const upload = multer(uploadConfig);

routes
  .get('/teste', teste)
  .get('/chat', getChat)
  .post('/chat', upload.single('image'), createChat)
  .post('/chat/audio', multer().single('audio'), createChatAudioMessage)
  .delete('/chat/:chatid', deleteChat);

export default routes;
