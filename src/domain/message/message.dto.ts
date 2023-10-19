export interface CreateMessageDto {
  chatId: string;
  content: string;
  contentType: 'audio' | 'text';
  owner: string;
}
