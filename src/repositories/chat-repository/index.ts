import { mongoClient } from '@/config';

export type CreateChatDto = {
  owner: string;
  participants: string[];
  content: string;
  contentType: string;
};

function findAll() {
  return mongoClient.chat.findMany();
}

function create({ participants, owner, content, contentType }: CreateChatDto) {
  return mongoClient.chat.create({
    data: {
      participants: participants,
      messages: {
        create: {
          content,
          contentType,
          senderId: owner,
        },
      },
    },
  });
}

export const ChatRepository = {
  findAll,
  create,
};
