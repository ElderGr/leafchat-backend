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
};

async function create({ chatId, content, contentType, owner }: CreateMessageDto) {
  return mongoClient.message.create({
    data: {
      content,
      contentType,
      chatId,
      senderId: owner,
      // chat: {
      //   connect: {
      //     id: chatId
      //   }
      // },
      // sender: {
      //   connect: {
      //     id: owner
      //   }
      // }
    },
  });
}

async function findAll({ chatId }: FindAllMessageDto) {
  return mongoClient.message.findMany({
    where: {
      chatId,
    },
  });
}

const messagesRepository = {
  create,
  findAll,
};

export default messagesRepository;
