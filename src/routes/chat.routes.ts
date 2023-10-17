import express from 'express';
import { createChat, getChat } from '@/controllers/chat.controller';
import { authenticateToken } from '@/middlewares/authentication.middleware';

const routes = express.Router();

routes.get('/chat', authenticateToken, getChat).post('/chat', authenticateToken, createChat);

export default routes;
