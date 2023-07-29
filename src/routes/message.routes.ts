import express from 'express';
import { createMessage, createAudioMessage } from '@/controllers/message.controller';
import uploadConfig from '@/config/upload';
import multer from 'multer';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post(`/message/:chatid`, upload.single('image'), createMessage);
routes.post(`/message/:chatid/audio`, multer().single('audio'), createAudioMessage);

export default routes;
