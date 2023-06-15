require('dotenv').config();

const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const connectedUsers = {};

io.on('connection', socket =>{

    const { user } = socket.handshake.query;
    
    connectedUsers[user] = socket.id;
});

app.use(cors());

app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen( process.env.PORT || 5000);


