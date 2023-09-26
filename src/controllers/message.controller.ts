import { io } from '@/app';
import messageService from '@/services/message-service';
import { Request, Response } from 'express';
import * as fs from 'fs';

export async function findAllMessages(req: Request, res: Response) {
  const { chatId } = req.query;
  const messages = await messageService.list({
    chatId: chatId as string,
  });

  return res.send(messages);
}

export async function createMessage(req: Request, res: Response) {
  const { chatId, content, contentType, owner } = req.body;
  const audio = req.file;

  if (contentType === 'audio') {
    if (!audio) {
      throw {
        message: 'No audio file',
      };
    }

    const fileName = `${owner}___${new Date().getTime()}.wav`;
    const uploadLocation = `./uploads/blob/${fileName}`;
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(audio.buffer)));

    const createMessage = await messageService.create({
      chatId,
      content: `${process.env.BACKEND_URL}/files/blob/${fileName}`,
      contentType,
      owner,
    });

    const messages = await messageService.list({
      chatId: chatId as string,
    });

    io.emit('message_list', messages);

    return res.send(createMessage);
  }

  const createMessage = await messageService.create({
    chatId,
    content,
    contentType,
    owner,
  });

  const messages = await messageService.list({
    chatId: chatId as string,
  });

  io.emit('message_list', messages);

  return res.send(createMessage);
  // return res.send(createMessage);
  //         let src;
  //         if(req.file !== undefined) {
  //             const { filename: image } = req.file;
  //             src = image;
  //         }

  //         const {chatid} = req.params;
  //         const {content, owner, receiver, type} = JSON.parse(req.body.content);

  //         const messageStruct = {
  //             image: req.file !== undefined ? `http://localhost:5000/files/${src}` : '',
  //             owner,
  //             receiver,
  //             content,
  //             type,
  //             timestamp: new Date().getTime()
  //         }

  //         //conexoes do socket
  //         const ownerSocket = req.connectedUsers[owner.id];
  //         const receiverSocket = req.connectedUsers[receiver.id];

  //         if(ownerSocket){
  //             req.io.to(ownerSocket).emit('chat message', messageStruct);
  //         }

  //         if(receiverSocket){
  //             req.io.to(receiverSocket).emit('chat message', messageStruct);
  //         }

  //         await database.ref(`Chats/${chatid}/messages`).push(messageStruct);

  //         return res.json({message: 'success'})
  //     }
}

export async function createAudioMessage(req: Request, res: Response) {
  // let src;
  // if (req.file !== undefined) {
  //   const { filename: audio } = req.file;
  //   src = audio;
  // }
  // const {chatid} = req.params;
  // const {content, owner, receiver, type} = JSON.parse(req.body.content);
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
  // //conexoes do socket
  // const ownerSocket = req.connectedUsers[owner.id];
  // const receiverSocket = req.connectedUsers[receiver.id];
  // if(ownerSocket){
  //   req.io.to(ownerSocket).emit('chat message', messageStruct);
  // }
  // if(receiverSocket){
  //   req.io.to(receiverSocket).emit('chat message', messageStruct);
  // }
  // await database.ref(`Chats/${chatid}/messages`).push(messageStruct);
  // return res.json({message: 'success'})
}
