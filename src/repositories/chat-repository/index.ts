import { mongoClient } from '@/config';

export type CreateChatDto = {
  owner: string;
  participants: ParticipantsModel[];
  content: string;
  contentType: string;
};

export type ParticipantsModel = {
  email: string;
  username: string;
  relationalId: string;
  profile_picture?: string;
};

function findAll() {
  return mongoClient.chat.findMany();
}

function create({ participants, owner, content, contentType }: CreateChatDto) {
  return mongoClient.chat.create({
    data: {
      participants: {
        connectOrCreate: participants.map((participant) => ({
          where: {
            relationalId: participant.relationalId,
          },
          create: participant,
        })),
      },
      messages: {
        create: {
          content: content,
          contentType: contentType,
          sender: {
            connect: {
              relationalId: owner,
            },
          },
        },
      },
    },
  });
}

export const ChatRepository = {
  findAll,
  create,
};
