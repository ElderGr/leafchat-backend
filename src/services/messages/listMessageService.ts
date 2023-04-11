import { Chat } from "src/entities/mongo/Chat";
import { getMongoRepository } from "typeorm";

export default async function listMessageService({ idChat }): Promise<Chat>{
  const chatRepository = getMongoRepository(Chat, `mongo`)
  const chat = await chatRepository.findByIds([idChat])

  return chat[0]
}
