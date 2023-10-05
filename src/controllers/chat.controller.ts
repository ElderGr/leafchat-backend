import { io } from '@/app';
import { FindAllChatsControllerParams, FindAllChatsDto } from '@/domain/chat/chat.dto';
import { AuthenticatedRequest } from '@/middlewares/authentication.middleware';
import { ChatService } from '@/services/chats-service';
import messageService from '@/services/message-service';
import { Request, Response } from 'express';
import * as fs from 'fs';

export async function getChat(req: Request, res: Response) {
  const { participants } = req.query as FindAllChatsControllerParams;

  const chats = await ChatService.findAll({
    participants: participants ? participants.split(',') : [],
  });
  return res.send(chats);
}

export async function createChat(req: AuthenticatedRequest, res: Response) {
  const { participants } = req.body;
  const chat = await ChatService.create({
    participants: participants,
  });

  return res.send(chat);
}
