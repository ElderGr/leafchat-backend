import { io } from '@/app';
import messageService from '@/services/message-service';
import { Request, Response } from 'express';
import * as fs from 'fs';

export async function findAllMessages(req: Request, res: Response) {
  const { chatId, page, pageSize } = req.query;
  const messages = await messageService.list({
    chatId: chatId as string,
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
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
    console.log(createMessage, 'socket');
    io.emit('message_list', createMessage);

    return res.send(createMessage);
  }

  const createMessage = await messageService.create({
    chatId,
    content,
    contentType,
    owner,
  });

  io.emit('message_list', createMessage);

  return res.send(createMessage);
}
