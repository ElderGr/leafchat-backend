import messagesRepository, {
  CreateMessageDto,
  FindAllMessageDto,
  MessageModel,
} from '@/repositories/messages-repository';

async function create({ content, contentType, chatId, owner }: CreateMessageDto): Promise<MessageModel> {
  const createdMessage = await messagesRepository.create({
    chatId,
    content,
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
