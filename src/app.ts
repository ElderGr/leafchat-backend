// require('dotenv').config();

import express, { Express } from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

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

app.use(cors()).use(express.json()).use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

export function init(): Promise<http.Server> {
  return Promise.resolve(server);
}

export default server;
