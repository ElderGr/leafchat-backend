import { ChatRepository } from '@/repositories/chat-repository';
import messagesRepository, {
  CreateMessageDto,
  FindAllMessageDto,
  MessageModel,
} from '@/repositories/messages-repository';
import { chatNotFoundError, noAudioFileSendError } from './error';
import * as fs from 'fs';

async function create({ content, contentType, chatId, owner, audio }: CreateMessageDto): Promise<MessageModel> {
  const targetChat = await ChatRepository.detail(chatId);

  if (!targetChat) {
    throw chatNotFoundError();
  }

  let finalContent = '';

  if (contentType === 'audio') {
    if (!audio) {
      throw noAudioFileSendError();
    }

    const fileName = `${owner}___${new Date().getTime()}.wav`;
    const uploadLocation = `./uploads/blob/${fileName}`;
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(audio.buffer)));

    finalContent = `${process.env.BACKEND_URL}/files/blob/${fileName}`;
  } else {
    finalContent = content;
  }

  const createdMessage = await messagesRepository.create({
    chatId,
    content: finalContent,
    contentType,
    owner,
  });

  return createdMessage;
}

async function list({ chatId, page, pageSize }: FindAllMessageDto): Promise<MessageModel[]> {
  const messages = await messagesRepository.findAll({
    chatId,
    page,
    pageSize,
  });

  return messages;
}

const messageService = {
  create,
  list,
};

export default messageService;
