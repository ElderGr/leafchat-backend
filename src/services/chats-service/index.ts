import { FindAllChatsDto } from '@/domain/chat/chat.dto';
import { ChatRepository, CreateChatDto } from '@/repositories/chat-repository';
import { io } from '@/app';

async function create({ participants }: CreateChatDto) {
  let chat = await ChatRepository.findByParticipants({
    participants,
  });

  if (!chat) {
    chat = await ChatRepository.create({
      participants,
    });
  }
  const chats = await ChatRepository.findAll({
    participants: participants,
  });

  io.emit('chat_list', chats);

  return chat;
}

async function findAll(params: FindAllChatsDto) {
  return await ChatRepository.findAll(params);
}

export const ChatService = {
  create,
  findAll,
};
