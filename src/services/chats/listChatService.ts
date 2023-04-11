import { Chat } from "src/entities/mongo/Chat";
import { getMongoRepository } from "typeorm";

export default async function listChatService(): Promise<Chat[]>{
  const chatRepository = getMongoRepository(Chat, `mongo`)
  const chats = await chatRepository.find()

  return chats
}
