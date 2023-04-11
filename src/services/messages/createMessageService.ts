import { Chat } from "src/entities/mongo/Chat";
import { Messages } from "src/entities/mongo/Messages";
import { getMongoRepository } from "typeorm";

interface IParams {
  message: string;
  from: string;
  to: string;
  id_chat: string;
}

export default async function createMessageService({
  message,
  from,
  to,
  id_chat
}: IParams): Promise<Chat> {
  const messageRepository = getMongoRepository(Messages, `mongo`)
  const chatRepository = getMongoRepository(Chat, `mongo`)

  const chatExists = await chatRepository.findByIds([id_chat])

  if (!chatExists[0]) {
    throw new Error(`Chat não encontrado`)
  }
  const newMessage = messageRepository.create({
    message,
    from,
    to,
  })

  await messageRepository.save(newMessage)

  chatExists[0].messages = [
    ...chatExists[0].messages,
    newMessage
  ]

  await chatRepository.update({
    id: id_chat
  }, {
    ...chatExists[0]
  })

  return chatExists[0]
}
