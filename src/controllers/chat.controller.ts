import { io } from '@/app';
import { AuthenticatedRequest } from '@/middlewares/authentication.middleware';
import { ChatService } from '@/services/chats-service';
import messageService from '@/services/message-service';
import { Request, Response } from 'express';
import * as fs from 'fs';

export async function getChat(req: Request, res: Response) {
  const chats = await ChatService.findAll();
  return res.send(chats);
}

export async function createChat(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { participants, content, contentType } = req.body;
  const audio = req.file;

  if (contentType === 'audio') {
    if (!audio) {
      throw {
        message: 'No audio file',
      };
    }

    const fileName = `${userId}___${new Date().getTime()}.wav`;
    const uploadLocation = `./uploads/blob/${fileName}`;
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(audio.buffer)));

    const chat = await ChatService.create({
      participants: participants.split(','),
      owner: userId,
      content: `${process.env.BACKEND_URL}/files/blob/${fileName}`,
      contentType,
    });

    const messages = await messageService.list({
      chatId: chat.id as string,
    });

    io.emit('message_list', messages);

    return res.send(chat);
  }

  const chat = await ChatService.create({
    participants: participants.split(','),
    owner: userId,
    content,
    contentType,
  });

  const messages = await messageService.list({
    chatId: chat.id as string,
  });

  io.emit('message_list', messages);

  return res.send(chat);
}
