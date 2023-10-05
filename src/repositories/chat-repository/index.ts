import { mongoClient } from '@/config';
import { FindAllChatsDto } from '@/domain/chat/chat.dto';

export type CreateChatDto = {
  participants: string[];
};

export type UpdateChatDto = {
  id: string;
  participants: string[];
};

function findAll({ participants }: FindAllChatsDto) {
  const params = {
    where: {},
  };

  if (participants && participants?.length > 0) {
    params.where = {
      participants: {
        hasSome: participants,
      },
    };
  }

  return mongoClient.chat.findMany(params);
}

function findByParticipants({ participants }: FindAllChatsDto) {
  const params = {
    where: {},
  };

  if (participants && participants?.length > 0) {
    params.where = {
      participants: {
        hasEvery: participants,
      },
    };
  }

  return mongoClient.chat.findFirst(params);
}

function detail(id: string) {
  return mongoClient.chat.findFirst({
    where: {
      id,
    },
  });
}

function create({ participants }: CreateChatDto) {
  return mongoClient.chat.create({
    data: {
      participants,
    },
  });
}

function update({ id, participants }: UpdateChatDto) {
  return mongoClient.chat.update({
    where: {
      id,
    },
    data: {
      participants,
    },
  });
}

export const ChatRepository = {
  findAll,
  create,
  detail,
  update,
  findByParticipants,
};
