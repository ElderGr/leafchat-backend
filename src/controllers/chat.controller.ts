import { io } from '@/app';
import { AuthenticatedRequest } from '@/middlewares/authentication.middleware';
import { ChatService } from '@/services/chats-service';
import { Request, Response } from 'express';

export async function getChat(req: Request, res: Response) {
  const chats = await ChatService.findAll();
  return res.send(chats);
}

export async function createChat(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { participants, content, contentType } = req.body;

  const chat = await ChatService.create({
    participants,
    owner: userId,
    content,
    contentType,
  });

  return res.send(chat);
  // let src;
  // if (req.file !== undefined) {
  //     const { filename: image } = req.file;
  //     src = image;
  // }
  // const { content, owner, receiver, type } = JSON.parse(req.body.content);
  // const messageStruct = {
  //     image: req.file !== undefined ? `http://localhost:5000/files/${src}` : '',
  //     owner,
  //     receiver,
  //     content,
  //     type,
  //     timestamp: new Date().getTime()
  // }
  // const chatStruct = {
  //     participants: [owner.id, receiver.id],
  //     messages: [messageStruct]
  // }
  // const chats = await database.ref('/Chats').once('value');
  // let targetChat = '';
  // chats.forEach(item => {
  //     if (item.val().participants.indexOf(owner.id) !== -1 && item.val().participants.indexOf(receiver.id) !== -1) targetChat = item.val();
  // })
  // //identifica se o chat existe ou não
  // let createdChat;
  // // console.log(targetChat)
  // if (targetChat === '') {
  //     await database.ref('/Chats').push(chatStruct).then(message => {
  //         createdChat = message.path.pieces_[1];
  //     })
  //     chatStruct.id = createdChat;
  //     //conexoes do socket
  //     const ownerSocket = req.connectedUsers[owner.id];
  //     const receiverSocket = req.connectedUsers[receiver.id];
  //     if (ownerSocket) {
  //         req.io.to(ownerSocket).emit('new chat', chatStruct);
  //     }
  //     if (receiverSocket) {
  //         req.io.to(receiverSocket).emit('new chat', chatStruct);
  //     }
  // }
  // return res.json({message: 'Chat created'})
}

export async function deleteChat(req: Request, res: Response) {
  // const {chatid} = req.params;
  // await database.ref(`Chats/${chatid}`).remove();
  // return res.json({res: 'teste'})
}

export async function createChatAudioMessage(req: Request, res: Response) {
  // let src;
  // if (req.file !== undefined) {
  //   const { filename: audio } = req.file;
  //   src = audio;
  // }
  // const { content, owner, receiver, type } = JSON.parse(req.body.content);
  // const fileName = `${owner.id}___${new Date().getTime()}.wav`;
  // let uploadLocation = `./uploads/blob/${fileName}`
  // fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
  // const messageStruct = {
  //   image: req.file !== undefined ? `http://localhost:5000/files/${src}` : '',
  //   owner,
  //   receiver,
  //   content: `http://localhost:5000/files/blob/${fileName}`,
  //   type,
  //   timestamp: new Date().getTime()
  // }
  // const chatStruct = {
  //   participants: [owner.id, receiver.id],
  //   messages: [messageStruct]
  // }
  // // console.log(messageStruct)
  // const chats = await database.ref('/Chats').once('value');
  // let targetChat = '';
  // chats.forEach(item => {
  //   if (item.val().participants.indexOf(owner.id) !== -1 && item.val().participants.indexOf(receiver.id) !== -1) targetChat = item.val();
  // })
  // //identifica se o chat existe ou não
  // let createdChat;
  // if (targetChat === '') {
  //   await database.ref('/Chats').push(chatStruct).then(message => {
  //       createdChat = message.path.pieces_[1];
  //   })
  //   chatStruct.id = createdChat;
  //   //conexoes do socket
  //   const ownerSocket = req.connectedUsers[owner.id];
  //   const receiverSocket = req.connectedUsers[receiver.id];
  //   if (ownerSocket) {
  //       req.io.to(ownerSocket).emit('new chat', chatStruct);
  //   }
  //   if (receiverSocket) {
  //       req.io.to(receiverSocket).emit('new chat', chatStruct);
  //   }
  // }
  // return res.json({message: 'Chat created'})
}
