import { io } from '@/app';
import { AuthenticatedRequest } from '@/middlewares/authentication.middleware';
import { CreateMessageDto } from '@/repositories/messages-repository';
import messageService from '@/services/message-service';
import { Request, Response } from 'express';

export async function findAllMessages(req: Request, res: Response) {
  const { chatId, page, pageSize } = req.query;
  const messages = await messageService.list({
    chatId: chatId as string,
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
  });

  return res.send(messages);
}

export async function createMessage(req: AuthenticatedRequest, res: Response) {
  const { chatId, content, contentType, owner } = req.body as CreateMessageDto;
  const audio = req.file;

  const createMessage = await messageService.create({
    chatId,
    content,
    contentType,
    owner,
    audio,
  });

  io.emit('message_list', createMessage);

  return res.send(createMessage);
}
