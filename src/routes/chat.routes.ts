import express from 'express'
import { createChat, deleteChat, getChat, teste, createChatAudioMessage } from '@controllers/chat.controller'
import uploadConfig from '@config/upload'
import multer from 'multer'

const routes = express.Router()
const upload = multer(uploadConfig);

routes.get('/teste', teste);
routes.get('/chat', getChat);
routes.post('/chat', upload.single('image'), createChat);
routes.post('/chat/audio', multer().single('audio'), createChatAudioMessage);
routes.delete('/chat/:chatid', deleteChat);

export default routes
