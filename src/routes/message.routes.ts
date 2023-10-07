import express from 'express';
import { createMessage, createAudioMessage, findAllMessages } from '@/controllers/message.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';

const routes = express.Router();
const upload = multer();

routes.post(`/message`, upload.single('audio'), createMessage);
routes.get(`/message`, findAllMessages);

// routes.post(`/message/:chatid/audio`, multer().single('audio'), createAudioMessage);

export default routes;
