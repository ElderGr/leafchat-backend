// require('dotenv').config();

import express, { Express } from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path'

const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

const connectedUsers = {};

// io.on('connection', socket =>{

//     const { user } = socket.handshake.query;
    
//     connectedUsers[user] = socket.id;
// });
app
  .use(cors())
  .use(express.json())
  .use(routes)

// app.use((req, res, next)=>{
//     req.io = io;
//     req.connectedUsers = connectedUsers;

//     return next();
// });

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

export function init(): Promise<Express>{

    return Promise.resolve(app);
}


export default app;


