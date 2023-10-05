import { FindAllChatsDto } from '@/domain/chat/chat.dto';
import { ChatRepository, CreateChatDto } from '@/repositories/chat-repository';

async function create({ participants }: CreateChatDto) {
  let chat = await ChatRepository.findByParticipants({
    participants,
  });

  if (!chat) {
    chat = await ChatRepository.create({
      participants,
    });
  }

  return chat;
}

async function findAll(params: FindAllChatsDto) {
  return await ChatRepository.findAll(params);
}

export const ChatService = {
  create,
  findAll,
};
