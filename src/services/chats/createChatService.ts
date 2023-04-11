import { Chat } from "src/entities/mongo/Chat";
import { Messages } from "src/entities/mongo/Messages";
import { getMongoRepository } from "typeorm";

interface IParams{
  participants: string[];
  name: string;
  message: Messages[];
}

export default async function createChatService({
  participants,
  name,
  message
}: IParams): Promise<Chat>{
  const chatRepository = getMongoRepository(Chat, `mongo`)

  const newChat = new Chat()
  newChat.name = name;
  newChat.participants = participants;
  newChat.messages = message

  await chatRepository.save(newChat)

  return newChat
}
