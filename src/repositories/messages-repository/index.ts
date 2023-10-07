import { mongoClient } from '@/config';

export type MessageModel = {
  id: string;
  content: string;
  contentType: string;
};

export type CreateMessageDto = {
  content: string;
  contentType: string;
  owner: string;
  chatId: string;
};

export type FindAllMessageDto = {
  chatId: string;
  page?: number;
  pageSize?: number;
};

async function create({ chatId, content, contentType, owner }: CreateMessageDto) {
  return mongoClient.message.create({
    data: {
      content,
      contentType,
      chatId,
      senderId: owner,
    },
  });
}

async function findAll({ chatId, page = 1, pageSize = 10 }: FindAllMessageDto) {
  return mongoClient.message.findMany({
    where: {
      chatId,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      created_at: 'desc',
    },
  });
}

const messagesRepository = {
  create,
  findAll,
};

export default messagesRepository;
