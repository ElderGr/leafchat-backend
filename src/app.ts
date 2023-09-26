import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { loadEnv } from './config';
import { handleApplicationErrors } from 'middlewares/error-handling-middleware';
import { connectMongoClient, connectPostgreDB, disconnectMongoClient, disconnectPostgreDB } from '@/config/database';
import messageService from './services/message-service';
import { ChatService } from './services/chats-service';

loadEnv();

const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat_list', async () => {
    const chats = await ChatService.findAll();
    socket.emit('chat_list', chats);
  });

  socket.on('message_list', async (chat) => {
    const message = await messageService.list({ chatId: chat });
    socket.emit('message_list', message);
  });

  // socket.on('message_create', async (data) => {
  //   await messageService.create({
  //     chatId: data.chatId,
  //     content: data.content,
  //     contentType: data.contentType,
  //     owner: data.owner
  //    })

  //    const messages = await messageService.list({ chatId: data.chatId })

  // });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

app
  .use(
    cors({
      origin: '*',
    }),
  )
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use(routes)
  .use(handleApplicationErrors);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

export function init(): Promise<http.Server> {
  connectMongoClient();
  connectPostgreDB();
  return Promise.resolve(server);
}

export async function close(): Promise<void> {
  await disconnectMongoClient();
  await disconnectPostgreDB();
}
