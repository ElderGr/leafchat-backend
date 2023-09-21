import { ChatRepository, CreateChatDto } from '@/repositories/chat-repository';

async function create({ participants, owner, content, contentType }: CreateChatDto) {
  const createdChat = await ChatRepository.create({
    content,
    contentType,
    owner,
    participants,
  });

  return createdChat;
}

async function findAll() {
  return;
}

export const ChatService = {
  create,
  findAll,
};
