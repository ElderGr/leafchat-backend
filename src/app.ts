import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { loadEnv } from './config';
import { handleApplicationErrors } from '@middleware/error-handling-middleware';

loadEnv();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', () => {
    console.log('message');
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use(routes)
  .use(handleApplicationErrors);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

export function init(): Promise<http.Server> {
  return Promise.resolve(server);
}

export default server;
